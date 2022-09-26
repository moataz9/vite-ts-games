import Enemy from './EnemyClass'
import Ghost from './GhostClass'
import Spider from './SpiderClass'
import Worm from './WormClass'

export default class Game {
  enemies: Enemy[] = []
  ctx: CanvasRenderingContext2D | null
  width: number
  height: number
  enemyInterval: number = 500
  enemyTimer: number = 0
  enemyTypes: string[] = ['ghost', 'worm', 'spider']
  constructor(ctx: CanvasRenderingContext2D | null, width: number, height: number) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }
  update(deltaTime: number) {
    this.enemies = this.enemies.filter(el => !el.markedForDeletion)
    if (this.enemyTimer > this.enemyInterval) {
      this.#addNewEmemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.enemies.forEach(el => el.update(deltaTime))
  }
  draw() {
    this.enemies.forEach(el => el.draw())
  }
  #addNewEmemy() {
    const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
    switch (randomEnemy) {
      case 'ghost':
        this.enemies.push(new Ghost(this))
        break
      case 'worm':
        this.enemies.push(new Worm(this))
        break
      case 'spider':
        this.enemies.push(new Spider(this))
        break
    }
    // this.enemies.sort((a, b) => a.y - b.y)
  }
}
