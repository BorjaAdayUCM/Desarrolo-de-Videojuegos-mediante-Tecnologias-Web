
export default class GameOver extends Phaser.Scene {

    constructor() {
        super("gameover");
    }

    init(data) {
        if(Object.entries(data).length > 0) {
            this.nivelActual = data.nombreNivel;
            this.mutedMusic = data.mutedMusic;
            this.mutedEffects = data.mutedEffects;
            this.score = data.score;
            this.checkpointX = data.checkpointX;
        }
    }

    create() {
        this.shameSound = this.sound.add("shameSound");
        this.shameSound.loop = true;
        this.shameSound.play();
        if(this.mutedMusic)  this.shameSound.pause();

        this.gameOverSound = this.sound.add("gameOverSound");
        this.gameOverSound.loop = true;
        this.gameOverSound.play();
        if(this.mutedMusic)  this.gameOverSound.pause();

        this.anims.create({
            key: "end",
            frames: this.anims.generateFrameNumbers("gameover", { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.background = this.add.sprite(500, 304, "end");

        this.buttonNo = this.add.image(619.5, 460, "noImage");

        this.buttonyes = this.add.image(405.0, 459.5, "yesImage");

        this.buttonNo.setInteractive({ useHandCursor: true }); this.buttonNo.on('pointerdown', () => this.goToTitle());
        this.buttonyes.setInteractive({ useHandCursor: true }); this.buttonyes.on('pointerdown', () => this.goToActualLevel());

    }

    goToTitle() {
        this.shameSound.pause();
        this.gameOverSound.pause();
        this.scene.start('title', {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects});
    }

    goToActualLevel() {
        this.shameSound.pause();
        this.gameOverSound.pause();
        this.scene.start(this.nivelActual, {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects, score: this.score, checkpointX: this.checkpointX});
    }

    update(time, delta) {
        this.background.anims.play("end", true);
    }
}