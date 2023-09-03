import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const baseOptions = {
    responsive: true,
    pointStyle: "line"
};


const temperature_options = {
    ... baseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Reactor Temperature',
        },
    },
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 300,
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, ticks) {
                    return value + ' °C';
                }
            }
        }
    }
};

const output_options = {
    ... baseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Energy Output',
        },
    },
    scales: {
        x: {
            min: 0,
            suggestedMax: 300,
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 300,
            ticks: {
                callback: function(value, index, ticks) {
                    return value + ' Watt';
                }
            }
        }
    }
};


const inputLevelList = Array.from({ length: 100 }, (_, i) => <option key={i} value={i}>{i}</option>)
  
const GameUI = (props) => {
    console.log(props)

    let temperature_indication_bg;

    let show_low_temperature_info = false
    let show_temperature_warning = false
    let show_temperature_critical = false

    if (props.currentTemperature <= 30) {
        temperature_indication_bg = "bg-blue-600"
        show_low_temperature_info = true
    } else if (props.currentTemperature <= 100){
        temperature_indication_bg = "bg-green-600"
    } else if (props.currentTemperature <= 150){
        temperature_indication_bg = "bg-yellow-600"
    } else if (props.currentTemperature < 200){
        temperature_indication_bg = "bg-orange-500"
        show_temperature_warning = true
    } else {
        temperature_indication_bg = "bg-red-500"
        show_temperature_critical = true
    }

    let labels = Array.from(Array(props.timeRunning).keys())

    let temperature_line_chart_data = {
        labels,
        datasets: [
            {
              label: 'Temperature',
              data: props.temperatureHistory,
              borderColor: 'red',
              backgroundColor: 'red',
            },
          ],
    }

    let output_line_chart_data = {
        labels,
        datasets: [
            {
              label: 'Electricity Output',
              data: props.electricityOutputHistory,
              borderColor: 'lime',
              backgroundColor: 'lime',
            },
          ],
    }

    return (
        <div className="w-full h-full mt-1">
            <div className="w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700">
                <h4>Reactor {props.reactorIsRunning ? "is Running" : "is Turned Off"}</h4>
                <button 
                    onClick={() => {props.reactorActivateOnClick()}}
                    className={`${(props.reactorIsRunning ? 'bg-red-400' : 'bg-green-400')} text-black p-1 border-solid border-2 rounded border-slate-900`}
                >{`${props.reactorIsRunning ? 'Stop' : 'Start'}`}</button>
            </div>
            
            <div className="flex flex-1 gap-2 my-2">
                <div className="border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full

                ">
                    <datalist id="input-level-list">
                        {inputLevelList}
                    </datalist>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        <label>Fuel Input</label>
                        <p className='text-right'>{props.currentFuelInputLevel}</p>
                        <input type='range' min="0" max="100" step="1" 
                            className="bg-neutral-600 text-right col-span-5"
                            onChange={props.fuelInputOnChange}
                            placeholder="0"
                            list="input-level-list"
                            value={props.currentFuelInputLevel}
                        ></input>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        <label>Cooling Level</label>
                        <p className='text-right'>{props.currentCoolingLevel}</p>
                        <input type='range' min="0" max="100" step="1" 
                            className="bg-neutral-600 text-right col-span-5" 
                            onChange={props.coolingLevelOnChange}
                            list="input-level-list"
                            value={props.currentCoolingLevel}
                        ></input>
                    </div>
                </div>

            </div>

            <div className='flex flex-1 gap-2 my-2'>

                <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
                    <div className="grid grid-cols-2 border-b-2 border-gray-200">
                        <p className="w-full">Temperature</p>
                        <div className={`${temperature_indication_bg} 
                            w-full text-right px-2 flex justify-end`}
                        >
                            <div>{props.currentTemperature.toFixed(2)}</div> 
                            <div className="w-[40px]">°C</div>
                        </div>    
                    </div>
                    <Line options={temperature_options} data={temperature_line_chart_data} />
                </div>

                <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
                    <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200">
                        <p className="w-full">Current Electricity Output</p>
                        <div className="w-full text-right px-2 flex justify-end">
                            <div>{props.currentElectricityOutput.toFixed(2)}</div> 
                            <div className="w-[40px]">Watt</div>
                        </div>
                    </div>
                    <Line options={output_options} data={output_line_chart_data} />
                </div>

            </div>

            <div className={`${show_low_temperature_info? '' : 'hidden'} 
                w-full border-gray-900 rounded bg-blue-500  p-2 my-2`}>
                <h4>INFO: Temperature is to low for a strong reaction to occur </h4>
            </div>

            <div className={`${show_temperature_warning? '' : 'hidden'} 
                w-full border-gray-900 rounded bg-orange-500 p-2 my-2`}>
                <h4>Temperature is high!</h4>
            </div>

            <div className={`${show_temperature_critical? '' : 'hidden'} 
                w-full border-gray-900 rounded bg-red-500  p-2 my-2`}>
                <h4>WARNING: Temperature is critical! <br></br>Reactor will soon explode!</h4>
            </div>

            
        </div>
    )
}

export default GameUI
