let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen;


function init() {
    initializeSoundState();
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

// Mobile touch controls
document.getElementById('move-left-mobile').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});
document.getElementById('move-left-mobile').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('move-right-mobile').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});
document.getElementById('move-right-mobile').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('jump-mobile').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
});
document.getElementById('jump-mobile').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
});

document.getElementById('attack-mobile').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.THROW = true;
});

document.getElementById('attack-mobile').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.THROW = false;
});

document.getElementById('mobile-play-btns').addEventListener("contextmenu", e => e.preventDefault());

function toggleFullscreen() {
    if (fullscreen) {
        closeFullscreen();
    } else { openFullscreen(); }
}


function openFullscreen() {
    let elem = document.querySelector('.canvas-position');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    document.getElementById('fullscreen').src = "../imgs/icons/exit-fullscreen.svg";
    fullscreen = true;
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    document.getElementById('fullscreen').src = "../imgs/icons/open-fullscreen.svg";
    fullscreen = false;
}


function hideWelcomeScreen() {
    if (world) {
        world.showWelcomeScreen = false;
        document.getElementById('start-game').classList.add('hidden');
    }
}

function showWelcomeScreen() {
    world.stopGame();
    SoundManager.resetLoadedSongs();
    init();
    if (world) {
        world.showWelcomeScreen = true;
        document.getElementById('start-game').classList.remove('hidden');
    }
    hideGameOverMenu();
}

function tryAgain() {
    world.stopGame();
    SoundManager.resetLoadedSongs();
    init();
    hideWelcomeScreen();
    hideGameOverMenu();
}

function initializeSoundState() {
    const gameMuted = localStorage.getItem("gameMuted") === 'true';
    if (gameMuted) {
        muteAllSounds();
    } else {
        unmuteAllSounds();
    }
}


function toggleSound() {
    localStorage.getItem("gameMuted") === 'true' ? unmuteAllSounds() : muteAllSounds();
}


function muteAllSounds() {
    SoundManager.muteAll();
    localStorage.setItem("gameMuted", 'true');
    document.getElementById('game-volume').src = './imgs/icons/sound-off.svg';
}


function unmuteAllSounds() {
    SoundManager.unmuteAll();
    localStorage.setItem("gameMuted", 'false');
    document.getElementById('game-volume').src = './imgs/icons/sound-on.svg';
}

document.addEventListener('click', (event) => {

    if (document.getElementById('instructions').style.display === 'block' &&
        !document.getElementById('instructions').contains(event.target) &&
        !document.getElementById('instructions-icon').contains(event.target)) {
        hideInstructions();
    }
});

function toggleInstructions() {
    document.getElementById('instructions').style.display === 'block' ? hideInstructions() : showInstructions();
}

function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('instructions-icon').style.backgroundColor = '#489ef3';
}

function hideInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instructions-icon').style.backgroundColor = 'transparent';
}

function hideGameOverMenu() {
    document.querySelector('.game-over-menu').style.display = 'none';
}
