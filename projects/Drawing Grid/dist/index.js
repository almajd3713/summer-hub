const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.screen.width * 0.4, height = canvas.height = window.screen.height * 0.4;
let camX = 0, camY = 0;
let draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(camX + 30, camY + 30);
    ctx.lineTo(camX + 30, camY + 70);
    ctx.lineTo(camX + 60, camY + 40);
    ctx.closePath();
    ctx.stroke();
    requestAnimationFrame(draw);
};
draw();
const jump = 2.5;
let currentKeys = {};
window.onkeydown = (e) => {
    currentKeys[e.key] = true;
    for (const key in currentKeys) {
        if (currentKeys[key]) {
            switch (key) {
                case "ArrowUp":
                    camY -= jump;
                    break;
                case "ArrowDown":
                    camY += jump;
                    break;
                case "ArrowLeft":
                    camX -= jump;
                    break;
                case "ArrowRight":
                    camX += jump;
                    break;
            }
        }
    }
};
window.onkeyup = (e) => {
    currentKeys[e.key] = false;
};
let mouseIsHeld = false;
let initialCoords, finalCoords;
canvas.onmousedown = (e) => {
    mouseIsHeld = true;
    initialCoords = { x: e.x, y: e.y };
};
canvas.onmousemove = (e) => {
    if (mouseIsHeld) {
        finalCoords = { x: e.x, y: e.y };
        const dx = finalCoords.x - initialCoords.x;
        const dy = finalCoords.y - initialCoords.y;
        camX += (dx / 100);
        camY += (dy / 100);
    }
};
canvas.onmouseout = canvas.onmouseup = (e) => {
    if (mouseIsHeld)
        mouseIsHeld = false;
};
export {};
//# sourceMappingURL=index.js.map