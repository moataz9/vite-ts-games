import '../assets/css/style.css'
import '../assets/css/enemy-variety.css'
import Game from './GameClass'


const npcRoot = document.getElementById('enemy-variety-root')! as HTMLDivElement

npcRoot.innerHTML = /* html */ `
  <canvas id="enemy-variety-canvas"></canvas>
`

const canvas = document.getElementById('enemy-variety-canvas')! as HTMLCanvasElement
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 800

let lastTime = 1

const game = new Game(ctx, canvas.width, canvas.height)

function animate(timeStamp: number) {
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  game.update(deltaTime)
  game.draw()
  requestAnimationFrame(animate)
}

animate(0)
