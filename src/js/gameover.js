import { Engine, TextAlign, BaseAlign, Actor, Label, Keys, FontUnit, Vector, Color, Scene, Font } from 'excalibur'
import { Resources } from './resources.js'

export class GameOver extends Scene {

    onInitialize(engine) {
        const bg = new Actor()
        bg.graphics.use(Resources.Gameover.toSprite())
        bg.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        this.add(bg)

        const currentScore = Number(localStorage.getItem('castle-crashers-last-score') || 0)
        const highScore = Number(localStorage.getItem('castle-crashers-high-score') || 0)
        localStorage.setItem('castle-crashers-last-score', String(currentScore))

        const label = new Label({
            text: `Game over!\nScore: ${currentScore}\nHigh score: ${highScore}\nPress ctrl + r to restart`,
            pos: new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 3),
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 20,
                color: Color.White,
                baseAlign: BaseAlign.Top,
                textAlign: TextAlign.Center
            })
        })
        this.add(label)
    }
}