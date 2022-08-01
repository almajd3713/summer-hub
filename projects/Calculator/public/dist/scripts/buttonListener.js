import buttonMatrix from "./buttonCreator.js";
let queue = [];
let buttonListener = (actionPair) => {
    let dims = actionPair[0];
    buttonMatrix[dims[0]][dims[1]].addEventListener("click", e => {
        queue.push();
    });
};
//# sourceMappingURL=buttonListener.js.map