export default class Boot extends Phaser.Scene {

    constructor() {
        super("boot");
    }

    preload() {
        /*****Titulo*****/
        this.load.spritesheet("title", "./assets/game/title/title.png", { frameWidth: 1000, frameHeight: 608 });
        this.load.audio("titleSound", "./assets/musica/title/title.ogg");

        /*****Menu*****/
        this.load.image('menu', './assets/game/menu/menu.png');
        this.load.image('play', './assets/game/menu/play.png');
        this.load.image('exit', './assets/game/menu/exit.png');
        this.load.image('music_off', './assets/game/menu/music_off.png');
        this.load.image('effects_off', './assets/game/menu/effects_off.png');
        this.load.image('music_on', './assets/game/menu/music_on.png');
        this.load.image('effects_on', './assets/game/menu/effects_on.png');

        /*****Nivel*****/

        //Niveles
        this.load.tilemapTiledJSON("level1","maps/mapa1.json");
        this.load.tilemapTiledJSON("level2","maps/mapa2.json");

        //Banda sonora
        this.load.audio('levelSound',"assets/musica/level/level.ogg");

        //Efectos de sonido
        this.load.audio('attackJohn1', "assets/musica/personajes/john/attack-john.mp3");
        this.load.audio('attackJohn2', "assets/musica/personajes/john/attack-sword.wav");
        this.load.audio('hurtJohn', "assets/musica/personajes/john/hurt_john.mp3");
        this.load.audio('jumpJohn', "assets/musica/personajes/john/jump.wav");
        this.load.audio('attackDaenerys', "assets/musica/personajes/daenerys/daenerys_attack.mp3");
        this.load.audio('hurtDaenerys', "assets/musica/personajes/daenerys/daenerys_hurt.mp3");
        this.load.audio('jumpDaenerys', "assets/musica/personajes/daenerys/daenerys_jump.mp3");

        //Mapa
        this.load.image("Floor0","assets/game/details/tileset.png");
        this.load.image("Floor1", "assets/game/details/base1.png");
        this.load.image("Background0_2","assets/game/backgrounds/background layer0b.png");
        this.load.image("Background1_2","assets/game/backgrounds/background layer1b.png");
        this.load.image("Background2_2","assets/game/backgrounds/background layer2b.png");
        this.load.image("Background3_2","assets/game/backgrounds/background layer3b.png");
        this.load.image("Background0","assets/game/backgrounds/background layer0.png");
        this.load.image("Background1","assets/game/backgrounds/background layer1.png");
        this.load.image("Background2","assets/game/backgrounds/background layer2.png");
        this.load.image("Background3","assets/game/backgrounds/background layer3.png");
        this.load.image("Details0", "assets/game/details/Build Your Tree 2.png");
        this.load.image("Details1", "assets/game/details/Build Your Tree.png");
        this.load.image("Details2", "assets/game/details/bush tree.png");

        //Barra de nivel
        this.load.image("barra_vacia", 'assets/game/barra/barra_vacia.png');
		this.load.image("corazon", 'assets/game/barra/corazon.png');
		this.load.image("john_circulo_on", 'assets/game/barra/john_circulo_on.png');
		this.load.image("john_circulo_off", 'assets/game/barra/john_circulo_off.png');
		this.load.image("daenerys_circulo_on", 'assets/game/barra/daenerys_circulo_on.png');
		this.load.image("daenerys_circulo_off", 'assets/game/barra/daenerys_circulo_off.png');
		this.load.image("aria_circulo_on", 'assets/game/barra/aria_circulo_on.png');
        this.load.image("aria_circulo_off", 'assets/game/barra/aria_circulo_off.png');
        this.load.image("pocion_escudo_barra", 'assets/game/barra/pocion_escudo_barra.png');
        this.load.image("pocion_vida_barra", 'assets/game/barra/pocion_vida_barra.png');
        this.load.image("pocion_salto_barra", 'assets/game/barra/pocion_salto_barra.png');

        //Personajes y objetos
        this.load.spritesheet('johnSpriteSheet', 'assets/game/personajes/john/john.png', { frameWidth: 144, frameHeight: 96 });
        this.load.spritesheet('daenerysSpriteSheet', 'assets/game/personajes/daenerys/daenerys.png', { frameWidth: 144, frameHeight: 96 });
        this.load.spritesheet('lanceroSpriteSheet', 'assets/game/personajes/lancero/lancero.png', { frameWidth: 112, frameHeight: 96 });
        this.load.spritesheet('caminanteSpriteSheet', 'assets/game/personajes/caminante/caminante.png', { frameWidth: 112, frameHeight: 96 });
        this.load.spritesheet('caminanteSpriteSheet', 'assets/game/personajes/caminante/caminante.png', { frameWidth: 112, frameHeight: 96 });
        this.load.spritesheet('pocionEscudoSpriteSheet', 'assets/game/pociones/pocion_escudo.png', { frameWidth: 58, frameHeight: 55 });
        this.load.spritesheet('pocionVidaSpriteSheet', 'assets/game/pociones/pocion_vida.png', { frameWidth: 58, frameHeight: 55 });
        this.load.spritesheet('pocionSaltoSpriteSheet', 'assets/game/pociones/pocion_salto.png', { frameWidth: 58, frameHeight: 55 });
        this.load.spritesheet('checkpointSpriteSheet', 'assets/game/checkpoint/checkpoint.png', { frameWidth: 52, frameHeight: 63 });
        this.load.image('lanzaSprite', 'assets/game/personajes/lancero/lanza.png');

        /*****Game Over*****/
        this.load.spritesheet("gameover", "./assets/game/gameover/gameover.png", { frameWidth: 1000, frameHeight: 608 });
        this.load.image("yesImage", "./assets/game/gameover/yes.png");
        this.load.image("noImage", "./assets/game/gameover/no.png");
        this.load.audio('shameSound', "assets/musica/gameover/shame.mp3");
        this.load.audio('gameOverSound', "assets/musica/gameover/gameover.mp3");

        /*****Win*****/
        this.load.spritesheet("win", "./assets/game/win/win.png", { frameWidth: 1000, frameHeight: 608 });
        this.load.audio("winSound", "./assets/musica/win/win.mp3");
    }

    create() {
       this.scene.start('title');
    }
}