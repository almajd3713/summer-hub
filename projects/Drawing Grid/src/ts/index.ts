import { Coords } from "./types"

const canvas = document.querySelector("#canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
const width = canvas.width = window.screen.width * 0.4, height = canvas.height = window.screen.height * 0.4

let camX = 0, camY = 0

let draw = () => {
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  ctx.moveTo(camX + 30, camY + 30)
  ctx.lineTo(camX + 30, camY + 70)
  ctx.lineTo(camX + 60, camY + 40)
  ctx.closePath()
  ctx.stroke()

  requestAnimationFrame(draw)
}

draw()

const jump: number = 2.5
let currentKeys: {
  [key: string]: boolean
} = {}

window.onkeydown = (e: KeyboardEvent) => {
  currentKeys[e.key] = true
  for(const key in currentKeys) {
    if(currentKeys[key]) {
      switch (key) {
        case "ArrowUp":
          camY -= jump
          break;
        case "ArrowDown":
          camY += jump
          break;
        case "ArrowLeft":
          camX -= jump
          break;
        case "ArrowRight":
          camX += jump
          break;
      }
    }
  }
}
window.onkeyup = (e: KeyboardEvent)=> {
  currentKeys[e.key] = false
}

let mouseIsHeld: boolean = false

let initialCoords: Coords, finalCoords: Coords
canvas.onmousedown = (e: MouseEvent) => {
  mouseIsHeld = true
  initialCoords = {x: e.x, y: e.y}
}
canvas.onmousemove = (e: MouseEvent) => {
  if(mouseIsHeld) {
    finalCoords = {x: e.x, y: e.y}
    const dx = finalCoords.x - initialCoords.x
    const dy = finalCoords.y - initialCoords.y
    // camX += dx >= 0 ? 1 : - (dx / 100)
    camX += (dx / 100)
    camY += (dy / 100)
    // if(dy >= 0) camY += 1; else camY += (dy / 100)
    // camY += dy >= 0 ? 1 : - (dy / 100)
  }
}
canvas.onmouseout = canvas.onmouseup = (e: MouseEvent) => {
  if(mouseIsHeld) mouseIsHeld = false
}