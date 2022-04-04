/// <reference types="vite/client" />

// app interfaces
interface AnimationState {
  name: string
  frames: number
}

interface Position {
  x: number
  y: number
}

interface Frame {
  loc: Position[]
}