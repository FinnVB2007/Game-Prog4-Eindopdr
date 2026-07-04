import { Actor, CollisionType, Vector } from 'excalibur'
import { Resources } from './resources.js'

export class Enemy extends Actor {
    constructor(side = 'left', variant = Math.random() < 0.25 ? 'fast' : 'slow') {
        super({ width: Resources.Mario.width, height: Resources.Mario.height })
        this.side = side
        this.variant = variant
        this.speed = variant === 'fast' ? 170 + Math.random() * 40 : 80 + Math.random() * 30
    }

    onInitialize(engine) {
        this.frameTimer = 0
        this.frameToggle = false
        this.zombieSprite1 = Resources.Zombie1.toSprite()
        this.zombieSprite2 = Resources.Zombie2.toSprite()
        this.zombieSprite1.width = Resources.Mario.width
        this.zombieSprite1.height = Resources.Mario.height
        this.zombieSprite2.width = Resources.Mario.width
        this.zombieSprite2.height = Resources.Mario.height
        this.graphics.use(this.zombieSprite1)
        this.body.collisionType = CollisionType.Active
        this.body.useGravity = false

        const width = engine.screen.resolution.width
        const height = engine.screen.resolution.height

        const margin = 80
        if (this.side === 'left') {
            this.pos = new Vector(-margin, 80 + Math.random() * (height - 160))
        } else if (this.side === 'right') {
            this.pos = new Vector(width + margin, 80 + Math.random() * (height - 160))
        }
    }

    onPreUpdate(engine, delta) {
        this.frameTimer += delta
        if (this.frameTimer > 140) {
            this.frameTimer = 0
            this.frameToggle = !this.frameToggle
            this.graphics.use(this.frameToggle ? this.zombieSprite2 : this.zombieSprite1)
        }

        const player = this.scene?.mario
        if (!player) return

        const direction = player.pos.clone().sub(this.pos)
        if (direction.size > 0) {
            this.vel = direction.normalize().scale(this.speed)
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Enemy) {
            const push = this.pos.clone().sub(other.owner.pos).normalize().scale(120)
            this.vel = push
            other.owner.vel = push.scale(-1)
        }
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x < -4000 || this.pos.x > 5000 || this.pos.y < -4000 || this.pos.y > 5000) {
            this.kill()
        }
    }
}
