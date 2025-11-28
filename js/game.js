let canvas;
let world;
let keyboard = new Keyboard();

function init() {
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
    'Space': 'UP',
    'KeyJ': 'THROW'
};

window.addEventListener('keydown', (event) => {
    if (KEYS[event.code]) keyboard[KEYS[event.code]] = true;
});

window.addEventListener('keyup', (event) => {
    if (KEYS[event.code]) keyboard[KEYS[event.code]] = false;
});


function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function fullscreen() {
    var elem = document.getElementById("canvas-wrapper");
    openFullscreen(elem);
}