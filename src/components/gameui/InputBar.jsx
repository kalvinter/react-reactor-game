import React, {useContext} from 'react'
import { ReactorDataContext } from '../Game'

const inputLevelList = Array.from({ length: 100 }, (_, i) => <option key={i} value={i}>{i}</option>)

export default function InputBar() {
    const reactorData = useContext(ReactorDataContext)

    return (
        <div className="flex flex-1 gap-2 my-2">
            <div className="border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full">
                <datalist id="input-level-list">
                    {inputLevelList}
                </datalist>
                <div className="grid grid-cols-8 gap-2 mb-2 items-center">
                    <label>Fuel</label>
                    <span className='text-right'>{reactorData.currentFuelInputLevel}</span>
                    <input type='range' min="0" max="100" step="1" 
                        className="bg-neutral-600 text-right col-span-6"
                        onChange={(event) => {reactorData.fuelInputOnChange(event)}}
                        placeholder="0"
                        list="input-level-list"
                        value={reactorData.currentFuelInputLevel}
                    ></input>
                </div>
                <div className="grid grid-cols-8 gap-2 items-center">
                    <label>Cooling</label>
                    <span className='text-right'>{reactorData.currentCoolingLevel}</span>
                    <input type='range' min="0" max="100" step="1" 
                        className="bg-neutral-600 text-right col-span-6" 
                        onChange={(event) => {reactorData.coolingLevelOnChange(event)}}
                        list="input-level-list"
                        value={reactorData.currentCoolingLevel}
                    ></input>
                </div>
            </div>

        </div>
    )
}
