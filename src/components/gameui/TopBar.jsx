import React, {useContext} from 'react'

import { GameDataContext } from '../Game.jsx';

import Card from '../common/Card.jsx';

import { PauseIcon, PlayIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ButtonSmall, buttonTypes } from '../common/Button.jsx';

function ButtonLabel (props) {


    return (
        <span className='flex items-center'>
            {props.gameData.gameIsPaused ? <PlayIcon className='small-icon'></PlayIcon> : <PauseIcon className='small-icon'></PauseIcon>}
            {props.gameData.gameIsPaused ? <span>&nbsp;Unpause</span> : <span>&nbsp;Pause</span>}
        </span>
    )
}


export default function TopBar(props) {
    const gameData = useContext(GameDataContext)

    let shiftTimeLeftInSeconds = Math.round(gameData.shiftTimeLeft / 1000)

    let pauseButton;
    if (gameData.gameIsLost){
        pauseButton = (
            <div className=" border-gray-900 rounded bg-red-500  px-2 py-1">
                You have lost
            </div>
        )
    } else {

        pauseButton = (
            <ButtonSmall
                onClick={(event) => {gameData.toggleGamePauseOnClick(event)}}
                buttonType={(gameData.gameIsPaused ? buttonTypes.successButton : buttonTypes.neutralButton)}
            >
                <ButtonLabel gameData={gameData} />
            </ButtonSmall>
        )
    }

    return (
        <Card className="w-full flex justify-between items-center mt-0 flex-col md:flex-row gap-2">
            <div>Time until shift ends: {shiftTimeLeftInSeconds} seconds</div>
            <div className='flex gap-1'>
                {pauseButton}
                <ButtonSmall
                    onClick={() => props.stopGame()}
                    buttonType={buttonTypes.neutralButton}
                >
                    <span className='flex items-center'>
                        <XMarkIcon className='small-icon' /> Quit
                    </span>
                </ButtonSmall>
            </div>
        </Card>
    )
}
