import React, { Component } from 'react'

import { Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import Game from '../components/Game';
import Welcome from '../components/Welcome';
import GameHistory from '../components/GameHistory';
import About from '../components/About';
import Navigation from '../components/Navigation';
import {AchievementsBar} from '../components/Achievements';

import Card from '../components/common/Card';

import ScrollToTop from '../components/ScrollToTop';

import ResetHistoryModal from '../components/modals/ResetHistoryModal';
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal';
import NotFoundPage from './404-page';

export const pages = {
    landingPage: "Landing Page",
    gamePage: "Game",
}

export class App extends Component {
    
  constructor(props){
    super(props);

    this.gameHistoryStorage = props.gameHistoryStorage

    this.achievementsManager = props.achievementsManager

    let gameHistory = this.gameHistoryStorage.load()
    console.log("gameHistory ", gameHistory)

    gameHistory = (gameHistory !== undefined)? gameHistory : []

    this.achievementsManager.checkGameHistoryEntries({gameHistoryEntries: gameHistory, unlockAchievements: true})

    this.defaultMainButtonConfig = {
        display: true,
        label: "Start your Shift",
        onClick: () => this.startGame()
    }

    this.state = {
        activePage: pages.landingPage,
        gameHistory: gameHistory,
        mainButtonConfig: this.defaultMainButtonConfig,
        showDeleteHistoryModal: false,
        showUnlockedAchievementsModal: false,
        newlyUnlockedAchievements: []
    }
  }

  toggleResetHistoryModal(){
    this.setState({
        showDeleteHistoryModal: !this.state.showDeleteHistoryModal
    })
  }

  toggleShowUnlockedAchievementsModal(){
    this.setState({
        showUnlockedAchievementsModal: !this.state.showUnlockedAchievementsModal
    })
  }

  deleteHistory(){
    this.gameHistoryStorage.deleteAllEntries()
    this.achievementsManager.resetAchievements()
    this.toggleResetHistoryModal()

    this.setState({
        gameHistory: []
    })
  }

  addGameToGameHistory({gameHistoryEntry}){
    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push(gameHistoryEntry)
    
    let newlyUnlockedAchievements = this.achievementsManager.checkGameHistoryEntries({
        gameHistoryEntries: gameHistory,
        unlockAchievements: true
    })

    console.log("newlyUnlocked ", newlyUnlockedAchievements)

    this.gameHistoryStorage.save({
        gameHistory: gameHistory
    })

    this.setState({
        gameHistory: gameHistory,
        newlyUnlockedAchievements: newlyUnlockedAchievements,
    })

    if (newlyUnlockedAchievements.length){
        this.showUnlockedAchievementsModalTimer = setTimeout(() => {
            this.setState({ showUnlockedAchievementsModal: true });
        }, 10);
    } else {
        this.setState({ showUnlockedAchievementsModal: false });
    }
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

  componentWillUnmount(){
    clearTimeout(this.showUnlockedAchievementsModalTimer)
  }

  render() {
    return (
            <Routes>
                <Route path='/'
                    element={
                        <div>
                            <ResetHistoryModal 
                                showModal={this.state.showDeleteHistoryModal}
                                cancelButtonOnClick={() => this.toggleResetHistoryModal()}
                                deleteButtonOnClick={() => this.deleteHistory()}
                            />

                            <UnlockedAchievementsModal 
                                showModal={this.state.showUnlockedAchievementsModal}
                                cancelButtonOnClick={() => this.toggleShowUnlockedAchievementsModal()}
                                newlyUnlockedAchievements={this.state.newlyUnlockedAchievements}
                            />

                            <Welcome
                                setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}} 
                                onClick={() => {this.startGame()}}
                            />

                            <Card>
                                <AchievementsBar 
                                    achievementsManager={this.achievementsManager}
                                    goToPage={(page) => {this.goToPage(page)}}
                                />
                            </Card>

                            <Card>
                                <GameHistory 
                                    gameHistory={this.state.gameHistory}
                                    deleteHistoryOnClick={() => this.toggleResetHistoryModal()}
                                />
                            </Card>

                            <Card>
                                <About />
                            </Card>
                        </div>
                    }
                />
                <Route path='/game/'
                    element={
                            <Game 
                                addGameToGameHistory={(gameResult) => this.addGameToGameHistory(gameResult)}
                                gameIsRunning={true}
                            />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
    )
  }
}

export default App
