import Level1 from './level1.js';

export default class Title extends Phaser.Scene {

    constructor() {
        super("title");
        this.mutedMusic = false;
        this.mutedEffects = false;
    }

    init(data) {
        if(Object.entries(data).length > 0) {
            this.mutedMusic = data.mutedMusic;
            this.mutedEffects = data.mutedEffects;
        }
    }

    create() {
        this.musica = this.sound.add("titleSound", {volume: 0.2});
        this.musica.loop = true;
        this.musica.play();
        if(this.mutedMusic) this.musica.pause();

        this.anims.create({
            key: "titleAnimation",
            frames: this.anims.generateFrameNumbers("title", { start: 0, end: 23 }),
            frameRate: 5,
            repeat: -1
        });

        this.background = this.add.sprite(500, 304, "titleAnimation");

        this.input.keyboard.on("keydown_ENTER", event => {
            this.goLevel1();
        });

    }
    
    goLevel1() {
        this.musica.pause();
        this.scene.start('level1', {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects, score: 0, checkpointX: 100});
    }


    update(time, delta) {
        this.background.anims.play("titleAnimation", true);
    }
}