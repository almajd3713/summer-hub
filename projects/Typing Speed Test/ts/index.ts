///<reference path="util.ts"/>

const genBtn = document.getElementById("testGenBtn") as HTMLButtonElement
const genDiv = document.getElementById("testDiv") as HTMLElement
const lastResultDisplay = document.getElementById("lastResultDisplay") as HTMLElement

let testText = "Did you ever hear the tragedy of darth plagueis the wise ?"
let specialKeys = ["Shift", "Alt", "Tab", "Control", "Enter", "Meta", "CapsLock"]

let counter = 0, mistakes = 0, firstRun = false
let inputListener = (e: KeyboardEvent) => {
  console.log(e.key)
  if(counter < 0) {counter = 0; return}
  else if(counter >= textArr.length) {counter -= 1; return}
  if(!specialKeys.find(key => key === e.key)) {
    let isCorrect = e.key === textArr[counter].trigger
    let el = textArr[counter].el
    if(pointerFlashInterval.length) {
      pointerFlashInterval.forEach(interval => {
        clearInterval(interval[0])
        interval[1].classList.remove("pointer")
      })
      pointerFlashInterval = []
    }
    if (isCorrect) {
      el.classList.add("correct")
      counter ++
    }
    else if(e.key === "Backspace") {
      counter --
      el.classList.remove("correct", "wrong")
    }
    else {
      el.classList.add("wrong")
      mistakes ++
      counter ++
    }
    pointerFlashInterval.push([setInterval(() => {
      el.classList.toggle("pointed")
    }, 1000), el])
    // if (!firstRun) {
    //   clearInterval(pointerFlashInterval)
    //   textArr[0].el.classList.remove("pointed")
    //   firstRun = true
    // }
    // else if (pointerFlashInterval) {
    //   clearInterval(pointerFlashInterval)
    //   pointerFlashInterval = 0
    //   textArr[counter].el.classList.remove("pointed")
    // }
    // pointerFlashInterval = setInterval(() => {
    //   textArr[counter].el.classList.toggle("pointed")
    // }, 1000)
    // if (e.key === textArr[counter].trigger) {
    //   textArr[counter].el.classList.add("correct")
    // } else if (e.key === "Backspace") {
    //   counter --
    //   textArr[counter].el.classList.remove("correct", "wrong")
    //   return;
    // } else {
    //   mistakes ++
    //   textArr[counter].el.classList.add("wrong")
    // }
    // counter ++
  }
}

let textArr: {trigger: string, el: HTMLElement}[]
let textArrGen = () => textArr = testText.split("").map(txt => {
  let el = createNode({
    tag: "span",
    textContent: txt,
  })
  genDiv.appendChild(el)
  return { trigger: txt, el: el }
})

let pointerFlashInterval: [number, HTMLElement][] = []
let testCycle = () => {
  window.removeEventListener("keydown", inputListener)
  let previousTestChild = genDiv.lastChild
  while(previousTestChild) {
    genDiv.removeChild(previousTestChild)
    previousTestChild = genDiv.lastChild
  }
  textArrGen()
  pointerFlashInterval.push([setInterval(() => {
    textArr[0].el.classList.toggle("pointed")
  }, 1000), textArr[0].el])
  window.addEventListener("keydown", inputListener)
}

genBtn.addEventListener("click", e => {
  testCycle()
})