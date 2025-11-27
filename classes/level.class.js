class Level {
    enemies;
    clouds;
    background;
    coins;
    bottles;
    level_end_x;

    constructor(enemies, clouds, background, coins, bottles, levelLength) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.bottles = bottles;
        this.level_end_x = levelLength;
    }

}
