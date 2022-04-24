import '../assets/css/style.css'
import '../assets/css/playing-animation.css'

import boom_img_src from '../assets/images/boom.png'

import Expolsion from './explosionClass'

const playingAnimation = document.getElementById('playing-animation-root')! as HTMLDivElement

playingAnimation.innerHTML = /* html */ `
  <canvas id="playing-animation-canvas"></canvas>
`

const playingAnimationCanvas = document.getElementById('playing-animation-canvas')! as HTMLCanvasElement

const ctx = playingAnimationCanvas.getContext('2d')
playingAnimationCanvas.width = 500
playingAnimationCanvas.height = 700

const explosions: Expolsion[] = []
let canvasPostion = playingAnimationCanvas.getBoundingClientRect()

function createAnimation(e: MouseEvent) {
  let posX = e.x - canvasPostion.left
  let posY = e.y - canvasPostion.top
  explosions.push(new Expolsion(posX, posY, boom_img_src, ctx))
}

window.addEventListener('click', e => {
  createAnimation(e)
})
window.addEventListener('mousemove', e => {
  createAnimation(e)
})

function animate() {
  ctx?.clearRect(0, 0, playingAnimationCanvas.width, playingAnimationCanvas.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }
  requestAnimationFrame(animate)
}

animate()
