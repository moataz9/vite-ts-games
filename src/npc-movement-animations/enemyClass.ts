export default class Enemy {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D | null
  // speed: number
  spirteWidth: number
  spirteHeight: number
  frame: number
  flapSpeed: number
  constructor(canvas: HTMLCanvasElement, imageSrc: string) {
    this.ctx = canvas.getContext('2d')
    this.image = new Image()
    this.image.src = imageSrc
    this.spirteHeight = 155
    this.spirteWidth = 293
    this.width = this.spirteWidth / 2.5
    this.height = this.spirteHeight / 2.5
    this.x = (canvas.width - this.width) * Math.random()
    this.y = (canvas.height - this.height) * Math.random()
    // this.speed = Math.random() * 4 - 2
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
  }
  update(gameFrame: number) {
    this.x += Math.random() * 5 - 2.5
    this.y += Math.random() * 5 - 2.5
    // animate spirtes
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
  draw() {
    this.ctx?.drawImage(
      this.image,
      this.frame * this.spirteWidth,
      0,
      this.spirteWidth,
      this.spirteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
