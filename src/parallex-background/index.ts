import '../assets/css/style.css'
import '../assets/css/parallex-background.css'
import Layer from './LayerClass'

import imageLayer1 from '../assets/images/layer-1.png'
import imageLayer2 from '../assets/images/layer-2.png'
import imageLayer3 from '../assets/images/layer-3.png'
import imageLayer4 from '../assets/images/layer-4.png'
import imageLayer5 from '../assets/images/layer-5.png'

const parallexRoot = document.getElementById('parallex-root')! as HTMLDivElement
parallexRoot.innerHTML = /* html */ `
  <div id="parallex-container">
    <canvas id="parallex-background-canvas"></canvas>
    <p>Game Speed: <span id="showGameSpeed"></span></p>
    <input type="range" min="0" max="20" value="5" class="slider" id="slider">
  </div>
`

const canvas = document.getElementById('parallex-background-canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

let gameSpeed = 5

const slider = document.getElementById('slider') as HTMLInputElement
slider.value = gameSpeed.toString()
const showGameSpeed = document.getElementById('showGameSpeed') as HTMLSpanElement
showGameSpeed.innerHTML = gameSpeed.toString()

slider.onchange = e => {
  let val = (<HTMLInputElement>e.target)?.value
  gameSpeed = Number(val)
  showGameSpeed.innerHTML = val
  layer1.gameSpeed = gameSpeed
  layer2.gameSpeed = gameSpeed
  layer3.gameSpeed = gameSpeed
  layer4.gameSpeed = gameSpeed
  layer5.gameSpeed = gameSpeed
}

const backgroundLayer1 = new Image()
const backgroundLayer2 = new Image()
const backgroundLayer3 = new Image()
const backgroundLayer4 = new Image()
const backgroundLayer5 = new Image()
backgroundLayer1.src = imageLayer1
backgroundLayer2.src = imageLayer2
backgroundLayer3.src = imageLayer3
backgroundLayer4.src = imageLayer4
backgroundLayer5.src = imageLayer5

const layer1 = new Layer(backgroundLayer1, ctx, 0.2, gameSpeed)
const layer2 = new Layer(backgroundLayer2, ctx, 0.4, gameSpeed)
const layer3 = new Layer(backgroundLayer3, ctx, 0.6, gameSpeed)
const layer4 = new Layer(backgroundLayer4, ctx, 0.8, gameSpeed)
const layer5 = new Layer(backgroundLayer5, ctx, 1, gameSpeed)

const gameLayers: Layer[] = [layer1, layer2, layer3, layer4, layer5]

function animate() {
  ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  layer4.draw()
  layer4.update()
  gameLayers.forEach(gameLayer => {
    gameLayer.draw()
    gameLayer.update()
  })
  requestAnimationFrame(animate)
}

animate()
