class SoundManager {
    static isMuted = false;
    static allSounds = [];

    static register(sound, volume = 1.0) {
        sound.volume = volume;
        this.allSounds.push(sound);
        sound.muted = this.isMuted;
        return sound;
    }

    static muteAll() {
        this.isMuted = true;
        this.allSounds.forEach(sound => sound.muted = true);
    }

    static unmuteAll() {
        this.isMuted = false;
        this.allSounds.forEach(sound => sound.muted = false);
    }

    static resetLoadedSongs() {
        this.allSounds.forEach(sound => sound.pause());
        this.allSounds = [];
    }
}