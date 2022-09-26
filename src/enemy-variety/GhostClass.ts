import Enemy from './EnemyClass'
import Game from './GameClass'

import ghost_image from '../assets/images/enemy_ghost.png'

export default class Ghost extends Enemy {
  image: HTMLImageElement = new Image()
  spriteWidth: number
  spriteHeight: number
  vx: number = Math.random() * 0.2 + 0.1
  angle: number = 0
  curve: number = Math.random() * 3
  constructor(game: Game) {
    super(game)
    this.spriteWidth = 261
    this.spriteHeight = 209
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.image.src = ghost_image
    this.x = this.game.width
    this.y = this.game.height * Math.random() * 0.6
  }
  update(deltaTime: number) {
    super.update(deltaTime)
    this.y += Math.sin(this.angle) * this.curve
    this.angle += 0.05
  }
  draw() {
    this.game.ctx?.save()
    this.game.ctx!.globalAlpha = 0.7
    super.draw()
    this.game.ctx?.restore()
  }
}
