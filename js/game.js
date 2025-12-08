let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen;
let timeLevelStart;
let timeLevelComplete;

function init(difficulty) {
    initializeSoundState();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, difficulty);
    timeLevelStart = new Date().getTime();
}

function getRuns() {
    return JSON.parse(sessionStorage.getItem('runTimes'));
}

function saveRun() {
    saveLevelTime();
    let runs = getRuns();
    if (runs !== null) {
        runs.push(timeLevelComplete);
        sessionStorage.setItem('runTimes', JSON.stringify(runs));
    } else {
        let runs = [timeLevelComplete];
        sessionStorage.setItem('runTimes', JSON.stringify(runs));
    }
    renderScoreBoard();
}

function saveLevelTime() {
    let endingTime = new Date().getTime();
    timeLevelComplete = endingTime - timeLevelStart;
}

function getPersonalBest() {
    let runs = getRuns();
    if (!runs.length) return null;
    let bestRun = runs[0];
    for (let i = 1; i < runs.length; i++) {
        if (runs[i] < bestRun) {
            bestRun = runs[i];
        }
    }
    return bestRun;
}

function renderScoreBoard() {
    bestTime = formatDuration(getPersonalBest());
    let htmlInsert = "";
    htmlInsert += getSessionBestTime(bestTime);
    let runs = getRuns();
    for (let index = 0; index < runs.length; index++) {
        htmlInsert += getRun(index + 1, formatDuration(runs[index]));
    }
    document.getElementById('personal-best-times').innerHTML = htmlInsert;
}

function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
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


function hideWelcomeScreen(difficulty) {
    if (world) {
        if (difficulty === 'hard') {
            init(difficulty);
        }
        world.showWelcomeScreen = false;
        document.querySelector('.select-difficulty').classList.add('hidden');
    }
}

function showWelcomeScreen() {
    world.stopGame();
    SoundManager.resetLoadedSongs();
    init();
    if (world) {
        world.showWelcomeScreen = true;
        document.querySelector('.select-difficulty').classList.remove('hidden');
    }
    hideGameOverMenu();
}

function tryAgain() {
    difficulty = world.difficulty;
    world.stopGame();
    SoundManager.resetLoadedSongs();
    init(difficulty);
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

document.addEventListener('click', (event) => {
    if (document.getElementById('personal-best-times').style.display === 'flex' &&
        !document.getElementById('personal-best-times').contains(event.target) &&
        !document.getElementById('trophy').contains(event.target)) {
        hidePlayerRunTimes();
    }
});

function toggleInstructions() {
    document.getElementById('instructions').style.display === 'block' ? hideInstructions() : showInstructions();
}

function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('instructions-icon').style.backgroundColor = '#007cf8';
}

function hideInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instructions-icon').style.backgroundColor = 'transparent';
}

function togglePlayerRunTimes() {
    document.getElementById('personal-best-times').style.display === 'flex' ? hidePlayerRunTimes() : showPlayerRunTimes();
}

function showPlayerRunTimes() {
    document.getElementById('personal-best-times').style.display = 'flex';
    document.getElementById('trophy').style.backgroundColor = '#007cf8';
}

function hidePlayerRunTimes() {
    document.getElementById('personal-best-times').style.display = 'none';
    document.getElementById('trophy').style.backgroundColor = 'transparent';
}

function hideGameOverMenu() {
    document.querySelector('.game-over-menu').style.display = 'none';
}

