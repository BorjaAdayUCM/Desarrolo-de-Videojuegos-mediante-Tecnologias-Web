export default class Win extends Phaser.Scene {

    constructor() {
        super("win");
    }

    init(data) {
        if(Object.entries(data).length > 0) {
            this.mutedMusic = data.mutedMusic;
            this.mutedEffects = data.mutedEffects;
            this.score = data.score;
        }
    }

    create() {
        this.musica = this.sound.add("winSound", {volume: 0.2});
        this.musica.loop = true;
        this.musica.play();
        if(this.mutedMusic) this.musica.pause();

        this.anims.create({
            key: "winAnimation",
            frames: this.anims.generateFrameNumbers("win", { start: 0, end: 23 }),
            frameRate: 5,
            repeat: -1
        });

        this.background = this.add.sprite(500, 304, "winAnimation");
        this.text = this.add.text(591.5309, 352.42935, this.score, {"fontSize": "12px"});
		this.text.setScale(5.2504606, 4.5636806);

        this.input.keyboard.on("keydown_ENTER", event => {
            this.goTitle();
        });

    }
    
    goTitle() {
        this.musica.pause();
        this.scene.start('title', {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects});
    }


    update(time, delta) {
        this.background.anims.play("winAnimation", true);
    }
}