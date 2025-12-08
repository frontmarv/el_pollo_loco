let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen;
let timeLevelStart;
let timeLevelComplete;

/**
 * Initialize game with difficulty and start timer.
 * @param {string} difficulty - Game difficulty level ('hard' or default).
 * @returns {void}
 */
function init(difficulty) {
    initializeSoundState();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, difficulty);
    timeLevelStart = new Date().getTime();
}

/**
 * Retrieve run times from session storage.
 * @returns {array}
 */
function getRuns() {
    return JSON.parse(sessionStorage.getItem('runTimes'));
}

/**
 * Save current level completion time to session storage.
 * @returns {void}
 */
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

/**
 * Calculate elapsed time since level start.
 * @returns {void}
 */
function saveLevelTime() {
    let endingTime = new Date().getTime();
    timeLevelComplete = endingTime - timeLevelStart;
}

/**
 * Find fastest run time from all recorded runs.
 * @returns {number}
 */
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

/**
 * Render score board with personal best and all run times.
 * @returns {void}
 */
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

/**
 * Format milliseconds to mm:ss:ms format.
 * @returns {string}
 */
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

/**
 * Toggles fullscreen mode on or off.
 * @returns {void}
 */
function toggleFullscreen() {
    if (fullscreen) {
        closeFullscreen();
    } else { openFullscreen(); }
}

/**
 * Opens fullscreen for the canvas element.
 * @returns {void}
 */
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

/**
 * Exits fullscreen mode.
 * @returns {void}
 */
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

/**
 * Hide welcome screen and initialize game with difficulty.
 * @param {string} difficulty - Game difficulty level ('hard' or default).
 * @returns {void}
 */
function hideWelcomeScreen(difficulty) {
    if (world) {
        if (difficulty === 'hard') {
            init(difficulty);
        }
        world.showWelcomeScreen = false;
        document.querySelector('.select-difficulty').classList.add('hidden');
    }
}

/**
 * Return to welcome screen and reset game state.
 * @returns {void}
 */
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

/**
 * Restart game with current difficulty.
 * @returns {void}
 */
function tryAgain() {
    difficulty = world.difficulty;
    world.stopGame();
    SoundManager.resetLoadedSongs();
    init(difficulty);
    hideWelcomeScreen();
    hideGameOverMenu();
}

/**
 * Load and apply mute state from local storage.
 * @returns {void}
 */
function initializeSoundState() {
    const gameMuted = localStorage.getItem("gameMuted") === 'true';
    if (gameMuted) {
        muteAllSounds();
    } else {
        unmuteAllSounds();
    }
}

/**
 * Toggle sound mute state and update icon.
 * @returns {void}
 */
function toggleSound() {
    localStorage.getItem("gameMuted") === 'true' ? unmuteAllSounds() : muteAllSounds();
}

/**
 * Mute all sounds and save state to local storage.
 * @returns {void}
 */
function muteAllSounds() {
    SoundManager.muteAll();
    localStorage.setItem("gameMuted", 'true');
    document.getElementById('game-volume').src = './imgs/icons/sound-off.svg';
}

/**
 * Unmute all sounds and save state to local storage.
 * @returns {void}
 */
function unmuteAllSounds() {
    SoundManager.unmuteAll();
    localStorage.setItem("gameMuted", 'false');
    document.getElementById('game-volume').src = './imgs/icons/sound-on.svg';
}

/**
 * Toggle instructions modal visibility.
 * @returns {void}
 */
function toggleInstructions() {
    document.getElementById('instructions').style.display === 'block' ? hideInstructions() : showInstructions();
}

/**
 * Show instructions modal and highlight icon.
 * @returns {void}
 */
function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('instructions-icon').style.backgroundColor = '#007cf8';
}

/**
 * Hide instructions modal and reset icon.
 * @returns {void}
 */
function hideInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instructions-icon').style.backgroundColor = 'transparent';
}

/**
 * Toggle run times display visibility.
 * @returns {void}
 */
function togglePlayerRunTimes() {
    document.getElementById('personal-best-times').style.display === 'flex' ? hidePlayerRunTimes() : showPlayerRunTimes();
}

/**
 * Show run times modal and highlight icon.
 * @returns {void}
 */
function showPlayerRunTimes() {
    document.getElementById('personal-best-times').style.display = 'flex';
    document.getElementById('trophy').style.backgroundColor = '#007cf8';
}

/**
 * Hide run times modal and reset icon.
 * @returns {void}
 */
function hidePlayerRunTimes() {
    document.getElementById('personal-best-times').style.display = 'none';
    document.getElementById('trophy').style.backgroundColor = 'transparent';
}

/**
 * Hide game over menu.
 * @returns {void}
 */
function hideGameOverMenu() {
    document.querySelector('.game-over-menu').style.display = 'none';
}

