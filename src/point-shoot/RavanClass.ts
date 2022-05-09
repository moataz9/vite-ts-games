
export default class Raven {
  height: number
  width: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  canvasCollision: HTMLCanvasElement
  CollisionCtx: CanvasRenderingContext2D | null
  x: number
  y: number
  directionX: number
  directionY: number
  markedForDeletion: boolean
  image: HTMLImageElement
  spriteWidth: number
  spriteHeigth: number
  sizeModifier: number
  frame: number
  maxFrame: number
  timeSinceFlap: number
  flapInterval: number
  randomColors: number[]
  color: string
  gameOver: boolean
  constructor(canvas: HTMLCanvasElement, canvasCollision: HTMLCanvasElement, imgSrc: string) {
    this.gameOver = false
    this.spriteWidth = 271
    this.spriteHeigth = 194
    this.sizeModifier = Math.random() * 0.6 + 0.4
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeigth * this.sizeModifier
    this.canvasCollision = canvasCollision
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.CollisionCtx = canvasCollision.getContext('2d')
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = imgSrc
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ]
    this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`
  }
  update(deltaTime: number) {
    if (this.y < 0 || this.y > this.canvas.height - this.height) {
      this.directionY = this.directionY * -1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < 0 - this.width) this.markedForDeletion = true
    this.timeSinceFlap += deltaTime
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
    }
    if (this.x < 0 - this.width) this.gameOver = true
  }
  draw() {
    this.CollisionCtx!.fillStyle = this.color
    this.CollisionCtx?.fillRect(this.x, this.y, this.width, this.height)
    this.ctx?.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeigth,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
