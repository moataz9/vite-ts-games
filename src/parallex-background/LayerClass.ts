export default class {
  x = 0
  y = 0
  width = 2400
  height = 700
  image: CanvasImageSource
  speedModifier: number
  speed: number
  _gameSpeed: number
  ctx: CanvasRenderingContext2D | null
  constructor(
    image: CanvasImageSource,
    ctx: CanvasRenderingContext2D | null,
    speedModifier: number,
    gameSpeed: number
  ) {
    this.image = image
    this.speedModifier = speedModifier
    this._gameSpeed = gameSpeed
    this.speed = gameSpeed * speedModifier
    this.ctx = ctx
  }
  update() {
    this.speed = this._gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = Math.floor(this.x - this.speed)
  }
  draw() {
    this.ctx?.drawImage(this.image, this.x, this.y, this.width, this.height)
    this.ctx?.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
  set gameSpeed(value: number) {
    this._gameSpeed = value
  }
}
