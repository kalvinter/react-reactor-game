import React, { Component } from 'react'

import Game from './components/Game';
import Welcome from './components/Welcome';
import GameHistory from './components/GameHistory';
import About from './pages/About';
import Navigation from './components/Navigation';

export const pages = {
    landingPage: "Landing Page",
    gamePage: "Game"
}

export class App extends Component {
    
  constructor(props){
    super(props);

    this.defaultMainButtonConfig = {
        display: true,
        label: "Start Game",
        onClick: () => this.startGame()
    }

    this.state = {
        activePage: pages.landingPage,
        gameHistory: [],
        mainButtonConfig: this.defaultMainButtonConfig
    }
  }

  goToPage(page){
    if (page === pages.landingPage){
        this.setState({            
            mainButtonConfig: this.defaultMainButtonConfig
        })
    }

    this.setState({
        activePage: page
    })
  }

  startGame(){
    this.setState({
        activePage: pages.gamePage
    })
  }

  addGameToGameHistory(gameResult){
    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push(gameResult)
    this.setState({
        gameHistory: gameHistory
    })
  }

  setMainButton(display, label, onClick){
    this.setState({
        mainButtonConfig: {
            display: display,
            label: label,
            onClick: onClick
        }
    })
  }

  render() {
    let app_body = "";

    switch (this.state.activePage){
        case pages.gamePage:
            app_body = (
                <Game 
                    goToPage={(page) => {this.goToPage(page)}}
                    setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}}
                    addGameToGameHistory={(gameResult) => this.addGameToGameHistory(gameResult)}
                    gameIsRunning={true}
                 />
              )
              break
        default:
            app_body = (
                <div className="main-card">
                    <Welcome
                        setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}} 
                        onClick={() => {this.startGame()}}
                    />

                    <div className='w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700'>

                        <GameHistory 
                            gameHistory={this.state.gameHistory}
                        />

                    </div>
                    <div className='w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700'>

                    <About />
                    </div>
                </div>
            )
        
    }

    return (
        <div className="App container">
            <Navigation
                mainButtonConfig={this.state.mainButtonConfig}
             />
            {app_body}
        </div>
    )
  }
}

export default App
