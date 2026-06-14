import { Engine, CollisionType, Actor, Color, Vector } from 'excalibur'
import { Resources } from './resources.js'

export class Coin extends Actor {

    constructor() {
        super({ radius: Resources.Coin.width / 2 }) // collision circle! 
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Coin.toSprite())
        this.pos = new Vector(Math.random() * engine.screen.resolution.width * 2, Math.random() * engine.screen.resolution.height - 300)
        this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0.8

    }

    onPostUpdate(engine, delta) {
        if (this.isOffScreen) {
            this.kill()
        }
    }
}