import '../assets/css/style.css'
import '../assets/css/point-shoot.css'
import raven_img_src from '../assets/images/raven.png'
import boom_img_src from '../assets/images/boom.png'
import boom_sound_src from '../assets/sounds/boom.flac'

import Raven from './RavanClass'
import Explosion from './boomClass'
// import Particle from './particleClass'

const pointShootRoot = document.getElementById('point-shoot-root')! as HTMLDivElement

pointShootRoot.innerHTML = /* html */ `
  <canvas id="point-shoot-canvas"></canvas>
  <canvas id="point-shoot-collisionCanvas"></canvas>
`

const pointShootCanvas = document.getElementById('point-shoot-canvas')! as HTMLCanvasElement
const ctx = pointShootCanvas.getContext('2d')
pointShootCanvas.width = window.innerWidth
pointShootCanvas.height = window.innerHeight
const pointShootCollisionCanvas = document.getElementById(
  'point-shoot-collisionCanvas'
)! as HTMLCanvasElement
const ctxCollisionCanvas = pointShootCollisionCanvas.getContext('2d')
pointShootCollisionCanvas.width = window.innerWidth
pointShootCollisionCanvas.height = window.innerHeight

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0
let ravens: Raven[] = []
let explosions: Explosion[] = []
let score = 0
let gameOver = false
ctx!.font = '50px Impact'

function drawScore() {
  ctx!.fillStyle = '#000'
  ctx!.fillText(`Score: ${score}`, 50, 75)
  ctx!.fillStyle = 'white'
  ctx!.fillText(`Score: ${score}`, 55, 80)
}

function drawGameScore() {
  ctx!.textAlign = 'center'
  ctx!.fillStyle = '#000'
  ctx?.fillText(
    'GAME OVER, your Score is ' + score,
    pointShootCanvas.width / 2,
    pointShootCanvas.height / 2
  )
  ctx!.fillStyle = '#fff'
  ctx?.fillText(
    'GAME OVER, your Score is ' + score,
    pointShootCanvas.width / 2 + 5,
    pointShootCanvas.height / 2 + 5
  )
}

window.addEventListener('click', e => {
  const detectPixelColor = ctxCollisionCanvas?.getImageData(e.x, e.y, 1, 1)
  // console.log(detectPixelColor)
  const pc = detectPixelColor!.data
  ravens.forEach(element => {
    if (
      element.randomColors[0] === pc[0] &&
      element.randomColors[1] === pc[1] &&
      element.randomColors[2] === pc[2]
    ) {
      element.markedForDeletion = true
      score++
      explosions.push(
        new Explosion(element.x, element.y, element.width, ctx, boom_img_src, boom_sound_src)
      )
    }
  })
})

function animate(timestamp: number) {
  ctx?.clearRect(0, 0, pointShootCanvas.width, pointShootCanvas.height)
  ctxCollisionCanvas?.clearRect(0, 0, pointShootCanvas.width, pointShootCanvas.height)
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven(pointShootCanvas, pointShootCollisionCanvas, raven_img_src))
    timeToNextRaven = 0
    ravens.sort((a, b) => a.width - b.width)
  }
  ;[...ravens, ...explosions].forEach(element => {
    element.update(deltaTime)
    element.draw()
  })
  ;[...ravens].forEach(element => {
    if (element.gameOver) gameOver = element.gameOver
  })
  // ;[...particles].forEach(element => {
  //   element.update()
  //   element.draw()
  // })
  ravens = ravens.filter(element => !element.markedForDeletion)
  explosions = explosions.filter(element => !element.markedForDeletion)
  drawScore()
  // console.log(ravens);
  timeToNextRaven += deltaTime
  if (!gameOver) requestAnimationFrame(animate)
  else drawGameScore()
}

animate(0)
