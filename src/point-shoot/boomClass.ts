export default class Explosion {
  image: HTMLImageElement
  spirteWidth: number
  spirteHeigth: number
  size: number
  x: number
  y: number
  frame: number
  sound: HTMLAudioElement
  timeSinceLastFrame: number
  frameInterval: number
  ctx: CanvasRenderingContext2D | null
  markedForDeletion: boolean
  constructor(
    x: number,
    y: number,
    size: number,
    ctx: CanvasRenderingContext2D | null,
    imgSrc: string,
    soundSrc: string
  ) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imgSrc
    this.spirteWidth = 200
    this.spirteHeigth = 179
    this.size = size
    this.x = x
    this.y = y
    this.frame = 0
    this.sound = new Audio()
    this.sound.src = soundSrc
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false
  }
  update(deltaTime: number) {
    if (this.frame === 0) this.sound.play()
    this.timeSinceLastFrame += deltaTime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++
      this.timeSinceLastFrame = 0
      if (this.frame > 5) this.markedForDeletion = true
    }
  }
  draw() {
    this.ctx?.drawImage(
      this.image,
      this.frame * this.spirteWidth,
      0,
      this.spirteWidth,
      this.spirteHeigth,
      this.x,
      this.y - this.size/4,
      this.size,
      this.size
    )
  }
}
