class GameOverScreen extends DrawableObject {
    x = 0;
    y = 0;
    img;
    height = 400;
    width = 700;

    constructor() {
        super().loadImage('../imgs/9_intro_outro_screens/game_over/game over!.png')
    }
}