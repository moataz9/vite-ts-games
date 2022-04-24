export default class Expolsion {
  x: number
  y: number
  spriteWidth: number
  spriteHeight: number
  width: number
  height: number
  image: HTMLImageElement
  frame: number
  timer: number
  angle: number
  ctx: CanvasRenderingContext2D | null
  constructor(x: number, y: number, imageSrc: string, ctx: CanvasRenderingContext2D | null) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * 0.7
    this.height = this.spriteHeight * 0.7
    this.x = x 
    this.y = y
    this.image = new Image()
    this.image.src = imageSrc
    this.frame = 0
    this.ctx = ctx
    this.timer = 0
    this.angle = Math.random() * 6.2
  }
  update() {
    this.timer++
    if (this.timer % 10 === 0) this.frame++
  }
  draw() {
    this.ctx?.save()
    this.ctx?.translate(this.x, this.y)
    this.ctx?.rotate(this.angle)
    this.ctx?.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    )
    this.ctx?.restore()
  }
}
