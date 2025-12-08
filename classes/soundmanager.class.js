class SoundManager {
    static isMuted = false;
    static allSounds = [];

/**
 * Register sound with optional volume and mute state.
 * @param {Audio} sound - Audio object to register.
 * @param {number} volume - Volume level (0-1), defaults to 1.0.
 * @returns {Audio}
 */
static register(sound, volume = 1.0) {
    sound.volume = volume;
    this.allSounds.push(sound);
    sound.muted = this.isMuted;
    return sound;
}

    /**
     * Mute all registered sounds.
     * @returns {void}
     */
    static muteAll() {
        this.isMuted = true;
        this.allSounds.forEach(sound => sound.muted = true);
    }

    /**
     * Unmute all registered sounds.
     * @returns {void}
     */
    static unmuteAll() {
        this.isMuted = false;
        this.allSounds.forEach(sound => sound.muted = false);
    }

    /**
     * Pause and clear all loaded sounds.
     * @returns {void}
     */
    static resetLoadedSongs() {
        this.allSounds.forEach(sound => sound.pause());
        this.allSounds = [];
    }
}