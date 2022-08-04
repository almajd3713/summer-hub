"use strict";
function createNode(props) {
    let node = document.createElement(props.tag || "div");
    if (props.className) {
        if (Array.isArray(props.className))
            props.className.forEach(classN => node.classList.add(classN));
        else
            node.className = props.className;
    }
    if (props.id) {
        node.setAttribute("id", props.id);
    }
    if (props.src) {
        node.setAttribute("src", props.src);
    }
    if (props.attributes) {
        props.attributes.forEach(attr => {
            node.setAttribute(attr[0], attr[1]);
        });
    }
    if (props.textContent) {
        node.innerHTML = props.textContent;
    }
    if (props.subNodes) {
        if (props.subNodes instanceof HTMLElement)
            node.appendChild(props.subNodes);
        else if (Array.isArray(props.subNodes))
            props.subNodes.forEach(subNode => {
                if (subNode instanceof HTMLElement)
                    node.appendChild(subNode);
                else
                    node.appendChild(createNode(subNode));
            });
        else
            node.appendChild(createNode(props.subNodes));
    }
    if (props.style)
        for (let prop in props.style) {
            node.style[prop] = props.style[prop];
        }
    if (props.onClick)
        node.onclick = props.onClick;
    return node;
}
const genBtn = document.getElementById("testGenBtn");
const genDiv = document.getElementById("testDiv");
const lastResultDisplay = document.getElementById("lastResultDisplay");
let testText = "Did you ever hear the tragedy of darth plagueis the wise ?";
let specialKeys = ["Shift", "Alt", "Tab", "Control", "Enter", "Meta", "CapsLock"];
let counter = 0, mistakes = 0, firstRun = false;
let inputListener = (e) => {
    console.log(e.key);
    if (counter < 0) {
        counter = 0;
        return;
    }
    else if (counter >= textArr.length) {
        counter -= 1;
        return;
    }
    if (!specialKeys.find(key => key === e.key)) {
        let isCorrect = e.key === textArr[counter].trigger;
        let el = textArr[counter].el;
        if (pointerFlashInterval.length) {
            pointerFlashInterval.forEach(interval => {
                clearInterval(interval[0]);
                interval[1].classList.remove("pointer");
            });
            pointerFlashInterval = [];
        }
        if (isCorrect) {
            el.classList.add("correct");
            counter++;
        }
        else if (e.key === "Backspace") {
            counter--;
            el.classList.remove("correct", "wrong");
        }
        else {
            el.classList.add("wrong");
            mistakes++;
            counter++;
        }
        pointerFlashInterval.push([setInterval(() => {
                el.classList.toggle("pointed");
            }, 1000), el]);
    }
};
let textArr;
let textArrGen = () => textArr = testText.split("").map(txt => {
    let el = createNode({
        tag: "span",
        textContent: txt,
    });
    genDiv.appendChild(el);
    return { trigger: txt, el: el };
});
let pointerFlashInterval = [];
let testCycle = () => {
    window.removeEventListener("keydown", inputListener);
    let previousTestChild = genDiv.lastChild;
    while (previousTestChild) {
        genDiv.removeChild(previousTestChild);
        previousTestChild = genDiv.lastChild;
    }
    textArrGen();
    pointerFlashInterval.push([setInterval(() => {
            textArr[0].el.classList.toggle("pointed");
        }, 1000), textArr[0].el]);
    window.addEventListener("keydown", inputListener);
};
genBtn.addEventListener("click", e => {
    testCycle();
});
