import Enemy from './EnemyClass'
import Game from './GameClass'

import spider_image from '../assets/images/enemy_spider.png'

export default class Spider extends Enemy {
  image: HTMLImageElement
  spriteWidth: number
  spriteHeight: number
  vx: number
  vy: number
  maxYLength: number
  constructor(game: Game) {
    super(game)
    this.spriteWidth = 310
    this.spriteHeight = 175
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.image = new Image()
    this.image.src = spider_image
    this.x = Math.random() * this.game.width
    this.y = 0 - this.height
    this.vx = 0
    this.vy = Math.random() * 0.1 + 0.2
    this.maxYLength = Math.random() * (this.game.height - 50)
  }
  update(deltaTime: number) {
    super.update(deltaTime)
    if (this.x < 0 - this.height * 2) {
      this.markedForDeletion = true
    }
    this.y += this.vy * deltaTime
    if (this.y > this.maxYLength) this.vy *= -1
  }
  draw() {
    this.game.ctx?.beginPath()
    this.game.ctx?.moveTo(this.x + this.width / 2, 0)
    this.game.ctx?.lineTo(this.x + this.width / 2, this.y)
    this.game.ctx?.stroke()
    super.draw()
    this.game.ctx?.restore()
  }
}
