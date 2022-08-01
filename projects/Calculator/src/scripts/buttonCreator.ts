import { createNode } from "./util.js"
import type {Dimensions} from "./buttonListener"

let dimensions: Dimensions = [5, 12]
let Mathjax = window.MathJax
// @ts-ignore
Mathjax.tex = {
  inlineMath: [["$$", "$$"], ["\\(", ")\\"]]
}

let buttonContent: string[][]
buttonContent = [
  ["", "$$x$$", "$$y$$", "$$z$$", "", "", "", "", "", "", "", "",],
  ["", "7", "8", "9", "", "", "", "", "", "", "", "",],
  ["", "4", "5", "6", "", "", "", "", "", "", "", "",],
  ["", "1", "2", "3", "", "", "", "", "", "", "", "",],
  ["", "", "0", "", "", "", "", "", "", "", "", "",]
]

const btnContainer = document.querySelector(".calcButtonsContainer") as HTMLElement
export let buttonMatrix: HTMLElement[][] = []
btnContainer.style.gridTemplateColumns  = `repeat(${dimensions[1]}, 1fr)`
for (let i = 0; i < dimensions[0]; i++) {
  let arr: HTMLElement[] = []
  for (let j = 0; j < dimensions[1]; j++) {
    let el = createNode({
      textContent: buttonContent[i][j]
    })
    btnContainer.appendChild(el)
    arr.push(el)
  }
  buttonMatrix.push(arr)
}
// @ts-ignore
Mathjax.typeset()
export default buttonMatrix

// for(let i = 1; i < 4; i++) {
//   for(let j = 1; j < 4; j++) {
//     buttonMatrix[i][j].style.backgroundColor = "#eee"
//   }
// }
