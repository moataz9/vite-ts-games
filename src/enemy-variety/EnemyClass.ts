import Game from './GameClass'

export default class Enemy {
  x: number
  y: number
  width: number = 100
  height: number = 100
  ctx: CanvasRenderingContext2D | null
  game: Game
  markedForDeletion: boolean = false
  image: HTMLImageElement = new Image()
  spriteWidth: number = 0
  spriteHeight: number = 0
  vx: number = 0
  frameX: number = 0
  maxFrame: number = 5
  frameInterval: number = 100
  frameTimer: number = 0
  constructor(game: Game) {
    this.game = game
    this.ctx = this.game.ctx
    this.x = this.game.width
    this.y = this.game.height * Math.random()
  }
  update(deltaTime: number) {
    this.x -= this.vx * deltaTime
    if (this.x < 0 - this.width) this.markedForDeletion = true
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw() {
    this.ctx?.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
