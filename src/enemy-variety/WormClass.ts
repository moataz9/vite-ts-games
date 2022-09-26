import Enemy from './EnemyClass'
import Game from './GameClass'

import worm_image from '../assets/images/enemy_worm.png'

export default class Worm extends Enemy {
  image: HTMLImageElement
  spriteWidth: number
  spriteHeight: number
  vx: number
  constructor(game: Game) {
    super(game)
    this.spriteWidth = 229
    this.spriteHeight = 171
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.image = new Image()
    this.image.src = worm_image
    this.x = this.game.width
    this.y = this.game.height - this.height
    this.vx = Math.random() * 0.1 + 0.1
  }
}
