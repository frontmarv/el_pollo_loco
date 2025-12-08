/**
 * Return HTML template for best time display.
 * @param {string} bestTime - Formatted best time string (mm:ss:ms).
 * @returns {string}
 */
function getSessionBestTime(bestTime) {
    return /*html*/ `
        <h3>Level Run Times (mm:ss:ms)</h3>
        <p><span>Session Best Time:</span><span id="best-time">${bestTime}</span></p>
        `
}

/**
 * Return HTML template for single run display.
 * @param {number} runNr - Run number (1-indexed).
 * @param {string} runTime - Formatted run time string (mm:ss:ms).
 * @returns {string}
 */
function getRun(runNr, runTime) {
    return /*html*/ `
        <p>Run ${runNr}: ${runTime}</p>
        `
}