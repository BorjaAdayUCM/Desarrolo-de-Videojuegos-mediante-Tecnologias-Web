import Level1 from "./level1.js";
import Level2 from "./level2.js";

export default class Menu extends Phaser.Scene {

    constructor() {
        super('menu');
    }

    create() {
        this.add.image(500.0, 304.0, "menu");
		this.buttonPlay = this.add.image(480.0, 165.0, "play");
		this.buttonExit = this.add.image(481.0, 240.0, "exit");
		this.buttonDesmuteMusic = this.add.image(360.0, 341.0, "music_off");
        this.buttonDesmuteEffects = this.add.image(616.0, 341.0, "effects_off");
        this.buttonMuteMusic = this.add.image(360.0, 341.0, "music_on");
		this.buttonMuteEffects = this.add.image(616.0, 341.0, "effects_on");

        this.buttonExit.setInteractive({ useHandCursor: true }); this.buttonExit.on('pointerdown', () => this.goToTitle());
        this.buttonPlay.setInteractive({ useHandCursor: true }); this.buttonPlay.on('pointerdown', () => this.goToActualLevel());
        this.buttonMuteMusic.setInteractive({ useHandCursor: true }); this.buttonMuteMusic.on('pointerdown', () => this.muteMusicFunction());
        this.buttonMuteEffects.setInteractive({ useHandCursor: true }); this.buttonMuteEffects.on('pointerdown', () => this.muteEffectsFunction());
        this.buttonDesmuteMusic.setInteractive({ useHandCursor: true }); this.buttonDesmuteMusic.on('pointerdown', () => this.desmuteMusicFunction());
        this.buttonDesmuteEffects.setInteractive({ useHandCursor: true }); this.buttonDesmuteEffects.on('pointerdown', () => this.desmuteEffectsFunction());
        
        this.buttonDesmuteMusic.setVisible(this.mutedMusic);
        this.buttonMuteMusic.setVisible(!this.mutedMusic);
        this.buttonDesmuteEffects.setVisible(this.mutedEffects);
        this.buttonMuteEffects.setVisible(!this.mutedEffects);

    }

    setMuteds(mutedMusic, mutedEffects) {
        this.mutedMusic = mutedMusic;
        this.mutedEffects = mutedEffects;
    }

    muteMusicFunction() {
        this.mutedMusic = true;
        this.buttonDesmuteMusic.setVisible(true);
        this.buttonMuteMusic.setVisible(false);
        this.scene.get(this.nivelActual).detieneMusica();
    }

    desmuteMusicFunction() {
        this.mutedMusic = false;
        this.buttonDesmuteMusic.setVisible(false);
        this.buttonMuteMusic.setVisible(true);
        this.scene.get(this.nivelActual).iniciaMusica();
    }

    muteEffectsFunction() {
        this.mutedEffects = true;
        this.buttonDesmuteEffects.setVisible(true);
        this.buttonMuteEffects.setVisible(false);
        this.scene.get(this.nivelActual).detieneEfectos();
    }

    desmuteEffectsFunction() {
        this.mutedEffects = false;
        this.buttonDesmuteEffects.setVisible(false);
        this.buttonMuteEffects.setVisible(true);
        this.scene.get(this.nivelActual).iniciaEfectos();
    }

    setNivelActual(nivelActual) {
        this.nivelActual = nivelActual;
    }

    goToTitle() {
        this.scene.get(this.nivelActual).detieneMusica();
        this.scene.remove(this.nivelActual);
        if(this.nivelActual === 'level1') this.scene.add(this.nivelActual, new Level1(), false);
        else if(this.nivelActual === 'level2') this.scene.add(this.nivelActual, new Level2(), false);
        this.scene.start('title', {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects});
    }

    goToActualLevel() {
        if(this.buttonMuteMusic.visible) this.scene.get(this.nivelActual).iniciaMusica();
        if(this.buttonMuteEffects.visible) this.scene.get(this.nivelActual).iniciaEfectos();
        this.scene.switch(this.nivelActual, 'menu');
    }

    update(time, delta) {

    }
}
