import { Actor, Vector, ParallaxComponent, Scene, Label, Font, Color } from 'excalibur'
import { Resources } from './resources.js'
import { Mario } from './mario.js'
import { Platform } from './platform.js'
import { Coin } from './coin.js'
import { Enemy } from './enemy.js'

export class Level2 extends Scene {
    mario
    score = 0
    spawnTimer = 0

    onInitialize(engine) {
        const bg = new Actor()
        const bgSprite = Resources.Background2.toSprite()
        bg.graphics.use(bgSprite)
        bg.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        bg.scale = new Vector(
            engine.screen.resolution.width / bgSprite.width,
            engine.screen.resolution.height / bgSprite.height
        )
        bg.z = -1000
        this.add(bg)

        this.score = Number(localStorage.getItem('castle-crashers-current-score') || 0)

        this.mario = new Mario()
        this.add(this.mario)

        this.uiLabel = new Label({
            text: '',
            pos: new Vector(40, 30),
            font: new Font({ family: 'Arial', size: 18, color: Color.White })
        })
        this.uiLabel.z = 1000
        this.uiLabel.fixed = true
        this.add(this.uiLabel)
        this.updateHud()

        this.camera.strategy.lockToActor(this.mario)
    }

    onPreUpdate(engine, delta) {
        this.spawnTimer += delta
        const spawnDelay = Math.max(220, 600 - this.score * 1.5)

        const activeEnemies = this.actors.filter(actor => actor instanceof Enemy).length

        if (this.spawnTimer > spawnDelay && activeEnemies < 100) {
            this.spawnTimer = 0
            const sides = ['left', 'right', 'top', 'bottom']
            const amount = 2 + Math.floor(this.score / 250)
            for (let i = 0; i < amount; i++) {
                if (this.actors.filter(actor => actor instanceof Enemy).length < 100) {
                    this.add(new Enemy(sides[Math.floor(Math.random() * sides.length)]))
                }
            }
        }
    }

    addScore(points) {
        this.score += points
        localStorage.setItem('castle-crashers-current-score', String(this.score))
        this.updateHud()
    }

    getHighScore() {
        return Number(localStorage.getItem('castle-crashers-high-score') || 0)
    }

    setHighScore() {
        const high = this.getHighScore()
        if (this.score > high) {
            localStorage.setItem('castle-crashers-high-score', String(this.score))
        }
    }

    updateHud() {
        if (this.uiLabel) {
            this.uiLabel.text = ''
        }
    }

}
