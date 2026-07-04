import { CollisionType, Actor, Vector, DegreeOfFreedom, Keys, Color } from 'excalibur'
import { Coin } from "./coin.js"
import { Enemy } from "./enemy.js"
import { Resources } from './resources.js'

export class Mario extends Actor {

    constructor() {
        super({ width: Resources.Mario.width, height: Resources.Mario.height }) // collision box!
        this.attackCooldown = 0
        this.damageCooldown = 0
        this.health = 3
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mario.toSprite())
        this.attackSprite = Resources.MarioAttack.toSprite()
        this.attackSprite.width = Resources.Mario.width
        this.attackSprite.height = Resources.Mario.height
        this.normalSprite = Resources.Mario.toSprite()
        this.normalSprite.width = Resources.Mario.width
        this.normalSprite.height = Resources.Mario.height
        this.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        this.body.collisionType = CollisionType.Active
        this.body.useGravity = false
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.healthbarBg = new Actor({ width: 52, height: 8, color: Color.fromRGB(40, 40, 40) })
        this.healthbar = new Actor({ width: 52, height: 8, color: Color.Green })
        this.healthbarBg.pos = new Vector(0, -58)
        this.healthbar.pos = new Vector(0, -58)
        this.addChild(this.healthbarBg)
        this.addChild(this.healthbar)
        this.updateHealthBar()
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Coin) {
            Resources.CoinSound.play()
            other.owner.kill()
        }

        if (other.owner instanceof Enemy) {
            if (this.attackCooldown > 0) {
                other.owner.kill()
                this.scene?.addScore(100)
                Resources.CoinSound.play()
            } else {
                this.takeDamage()
            }
        }
    }

    onPreUpdate(engine, delta) {
        this.attackCooldown = Math.max(0, this.attackCooldown - delta)
        this.damageCooldown = Math.max(0, this.damageCooldown - delta)

        if (this.attackCooldown > 0) {
            this.graphics.use(this.attackSprite)
        } else {
            this.graphics.use(this.normalSprite)
        }

        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -300
        }
        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 300
        }
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -300
            this.graphics.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 300
            this.graphics.flipHorizontal = false
        }

        if ((engine.input.keyboard.wasPressed(Keys.Space) || engine.input.keyboard.wasPressed(Keys.J)) && this.attackCooldown === 0) {
            this.meleeAttack()
        }

        this.vel = new Vector(xspeed, yspeed)
    }

    updateHealthBar() {
        if (this.healthbar) {
            this.healthbar.scale = new Vector(this.health / 3, 1)
        }
    }

    takeDamage() {
        if (this.damageCooldown > 0 || this.health <= 0) return

        this.damageCooldown = 700
        this.health -= 1
        this.updateHealthBar()
        this.scene.updateHud()

        if (this.health <= 0) {
            this.kill()
            const scoreToSave = this.scene.score ?? 0
            localStorage.setItem('castle-crashers-last-score', String(scoreToSave))
            if (this.scene.setHighScore) {
                this.scene.setHighScore()
            }
            this.scene.engine.goToScene('game-over')
        }
    }

    meleeAttack() {
        this.attackCooldown = 250

        const enemies = this.scene.actors.filter(actor => actor instanceof Enemy)
        for (const enemy of enemies) {
            const distance = enemy.pos.distance(this.pos)
            if (distance < 95) {
                enemy.kill()
                this.scene.addScore(100)
                Resources.CoinSound.play()
            }
        }
    }

}
