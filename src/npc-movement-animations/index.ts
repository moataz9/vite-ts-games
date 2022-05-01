import '../assets/css/style.css'
import '../assets/css/npc-movement-animations.css'

import enemy1_img_src from '../assets/images/enemy1.png'

import Enemy from './enemyClass'

const npcRoot = document.getElementById('npc-movement-root')! as HTMLDivElement

npcRoot.innerHTML = /* html */ `
  <canvas id="npc-movement-canvas"></canvas>
`

const npcMovementCanvas = document.getElementById('npc-movement-canvas')! as HTMLCanvasElement
const ctx = npcMovementCanvas.getContext('2d')
const CANVAS_WIDTH = (npcMovementCanvas.width = 500)
const CANVAS_HEIGHT = (npcMovementCanvas.height = 1000)

const numberOfEnemies = 103
const enemiesArr: Enemy[] = []

let gameFrame = 0

for (let i = 0; i < numberOfEnemies; i += 1) {
  enemiesArr.push(new Enemy(npcMovementCanvas, enemy1_img_src))
}

console.log(enemiesArr)

function animate() {
  gameFrame++
  ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemiesArr.forEach(enemy => {
    enemy.update(gameFrame)
    enemy.draw()
  })
  requestAnimationFrame(animate)
}

animate()
