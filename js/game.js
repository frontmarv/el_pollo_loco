let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

const KEYS = {
    'KeyA': 'LEFT',
    'ArrowLeft': 'LEFT',
    'KeyD': 'RIGHT',
    'ArrowRight': 'RIGHT',
    'KeyW': 'UP',
    'ArrowUp': 'UP',
    'KeyS': 'DOWN',
    'ArrowDown': 'DOWN',
    'Space': 'UP'
};

window.addEventListener('keydown', (event) => {
    if (KEYS[event.code]) keyboard[KEYS[event.code]] = true;
});

window.addEventListener('keyup', (event) => {
    if (KEYS[event.code]) keyboard[KEYS[event.code]] = false;
});