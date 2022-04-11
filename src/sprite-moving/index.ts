import '../assets/css/style.css'
import '../assets/css/spirte-moving.css'
import shadowDogImage from '../assets/images/shadow_dog.png'

import animationStates from './animationState'

const spriteMoving = document.getElementById('sprite-moving-root')! as HTMLDivElement
spriteMoving.innerHTML = /* html */ `
  <canvas id="spirte-moveing-canvas"></canvas>
  <div class="controls">
    <label for="animations">Choose Animations</label>
    <select name="animations" id="animations">
      <option value="idle">Idle</option>
      <option value="jump">Jump</option>
      <option value="fall">Fall</option>
      <option value="run">Run</option>
      <option value="dizzy">Dizzy</option>
      <option value="sit">Sit</option>
      <option value="roll">Roll</option>
      <option value="bite">Bite</option>
      <option value="ko">Ko</option>
      <option value="getHit">Get Hit</option>
    </select>
  </div>
`

let playerState = 'idle'
const dropdowm = document.getElementById('animations')! as HTMLSelectElement

dropdowm.onchange = e => {
  playerState = (<HTMLSelectElement>e.target)?.value
}

const canvas = document.getElementById('spirte-moveing-canvas')! as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = shadowDogImage
const spriteWidth = 575
const spirteHeight = 523

let gameFrame = 0
const staggerFrames = 7

let spriteAnimation: Frame[] = []

animationStates.forEach((state, index) => {
  let frames: Frame = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let posX = j * spriteWidth
    let posY = index * spirteHeight
    frames.loc.push({ x: posX, y: posY })
  }
  spriteAnimation[state.name as any] = frames
})

function animate() {
  ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimation[playerState as any].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimation[playerState as any].loc[position].y
  ctx?.drawImage(playerImage, frameX, frameY, spriteWidth, spirteHeight, 0, 0, spriteWidth, spirteHeight)
  gameFrame++
  requestAnimationFrame(animate)
}

animate()
