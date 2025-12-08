function getSessionBestTime(bestTime) {
    return /*html*/ `
        <h3>Level Run Times (mm:ss:ms)</h3>
        <p><span>Session Best Time:</span><span id="best-time">${bestTime}</span></p>
        `
}

function getRun(runNr, runTime) {
    return /*html*/ `
        <p>Run ${runNr}: ${runTime}</p>
        `
}