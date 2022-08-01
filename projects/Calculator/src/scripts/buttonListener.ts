import buttonMatrix from "./buttonCreator.js"
// import { LinkedList } from "./types.js"
export type Dimensions = [rows: number, columns: number]

type actionPair = [buttonDims: Dimensions, action: () => void]
let queue: ((oldVal: number) => number)[] = []

let buttonListener = (actionPair: actionPair) => {
  let dims = actionPair[0]
  buttonMatrix[dims[0]][dims[1]].addEventListener("click", e => {
    queue.push()
  })
}


// let actionSelector = (action: string) => {
//   switch (action) {
//     case "add":
//       return ()
//       break;
//   }
// }

// const buttonListener = (actionPairs: actionPair[]) => {
//   actionPairs.forEach(actionPair => {
//     let dims = actionPair[0]
//     buttonMatrix[dims[0]][dims[1]].addEventListener("click", e => {
//       queue.push(actionPair[1])
//     })
//   })
// } 