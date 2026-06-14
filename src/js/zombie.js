import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from './resources.js'

export class Zombie extends Actor {

    constructor() {
        super({ width: Resources.Crate.width, height: Resources.Crate.height }) // collision box! 
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Crate.toSprite())
        this.pos = new Vector(Math.random() * engine.screen.resolution.width * 2, Math.random() * engine.screen.resolution.height - 300)
        this.body.collisionType = CollisionType.Active
        this.vel = new Vector()

    }

    onPostUpdate(engine, delta) {
        if (this.isOffScreen) {
            this.kill()
        }
    }
}