import { Engine, Vector, Scene, SolverStrategy, FadeInOut, Color, DisplayMode } from 'excalibur'
import { ResourceLoader } from './resources.js'
import { Level } from "./level.js"
import { Level2 } from "./level2.js"
import { GameOver } from "./gameover.js"

export class Game extends Engine {

    constructor() {
        super({
            width: 1600,
            height: 760,
            displayMode: DisplayMode.FitScreen,
            suppressHiDPIScaling: true,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 0),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('level', new Level())
        this.add('level2', new Level2())
        this.add('game-over', new GameOver())
        this.goToScene('level')
    }

}

new Game()