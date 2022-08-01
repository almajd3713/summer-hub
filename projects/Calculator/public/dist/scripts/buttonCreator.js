import { createNode } from "./util.js";
let dimensions = [5, 12];
let Mathjax = window.MathJax;
Mathjax.tex = {
    inlineMath: [["$$", "$$"], ["\\(", ")\\"]]
};
let buttonContent;
buttonContent = [
    ["", "$$x$$", "$$y$$", "$$z$$", "", "", "", "", "", "", "", "",],
    ["", "7", "8", "9", "", "", "", "", "", "", "", "",],
    ["", "4", "5", "6", "", "", "", "", "", "", "", "",],
    ["", "1", "2", "3", "", "", "", "", "", "", "", "",],
    ["", "", "0", "", "", "", "", "", "", "", "", "",]
];
const btnContainer = document.querySelector(".calcButtonsContainer");
export let buttonMatrix = [];
btnContainer.style.gridTemplateColumns = `repeat(${dimensions[1]}, 1fr)`;
for (let i = 0; i < dimensions[0]; i++) {
    let arr = [];
    for (let j = 0; j < dimensions[1]; j++) {
        let el = createNode({
            textContent: buttonContent[i][j]
        });
        btnContainer.appendChild(el);
        arr.push(el);
    }
    buttonMatrix.push(arr);
}
Mathjax.typeset();
export default buttonMatrix;
//# sourceMappingURL=buttonCreator.js.map