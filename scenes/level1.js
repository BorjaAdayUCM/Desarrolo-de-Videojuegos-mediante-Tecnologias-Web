import John from '../entities/players/john.js';
import Daenerys from '../entities/players/daenerys.js'
import Lancero from '../entities/lancero.js';
import Lanza from '../entities/lanza.js';
import Caminante from '../entities/caminante.js';
import Level from './level.js';
import Pocion from '../objects/pocion.js';


export default class Level1 extends Level {
    
    constructor() {
        super("level1");
        this.nombreNivel = 'level1'
        this.siguienteNivel = 'level2';
    }

    preload() {
        super.preload();
    }
    
    create() {
        super.create();
    }

    personalizaBarra() {
        this.johnOff.setVisible(false);
    }
    
    update(time, delta) {
       super.update();
    }

    cargaMapayFondos() {
        this.map = this.make.tilemap({key:"level1", tileWidth:64, tileHeight:64});

        this.backgrounds[0] = this.add.tileSprite(0, 0, this.width, this.height, "Background0").setOrigin(0,0).setScrollFactor(0);
        this.backgrounds[1] = this.add.tileSprite(0, 0, this.width, this.height, "Background1").setOrigin(0,0).setScrollFactor(0);
        this.backgrounds[2] = this.add.tileSprite(0, 0, this.width, this.height, "Background2").setOrigin(0,0).setScrollFactor(0);
        this.backgrounds[3] = this.add.tileSprite(0, 0, this.width, this.height, "Background3").setOrigin(0,0).setScrollFactor(0);
    }

    crearPocion() {
        const powerUp = this.map.findObject("PowerUps", obj => obj.name === "PowerUp1");
        this.powerUp = new Pocion(this, powerUp.x + (powerUp.width / 2), powerUp.y + (powerUp.height / 2), 'pocionEscudoSpriteSheet', 0);
    }

    crearEnemigos() {
        const lancero1 =  this.map.findObject("Enemigos", obj => obj.name === "Lancero1");
        const lancero2 =  this.map.findObject("Enemigos", obj => obj.name === "Lancero2");
        const lancero3 =  this.map.findObject("Enemigos", obj => obj.name === "Lancero3");
        const lancero4 =  this.map.findObject("Enemigos", obj => obj.name === "Lancero4");
        const caminante1 =  this.map.findObject("Enemigos", obj => obj.name === "Caminante1");
        const caminante2 =  this.map.findObject("Enemigos", obj => obj.name === "Caminante2");
        const caminante3 =  this.map.findObject("Enemigos", obj => obj.name === "Caminante3");
        const caminante4 =  this.map.findObject("Enemigos", obj => obj.name === "Caminante4");
        const caminante5 =  this.map.findObject("Enemigos", obj => obj.name === "Caminante5");
        
       
        new Lancero(this, lancero1.x, lancero1.y);
        new Lancero(this, lancero2.x, lancero2.y);
        new Lancero(this, lancero3.x, lancero3.y);
        new Lancero(this, lancero4.x, lancero4.y);
        new Caminante(this, caminante1.x, caminante1.y);
        new Caminante(this, caminante2.x, caminante2.y);
        new Caminante(this, caminante3.x, caminante3.y);
        new Caminante(this, caminante4.x, caminante4.y);
        new Caminante(this, caminante5.x, caminante5.y);
    }

    crearJugadores() {
        this.player = new John(this, this.checkpointX, 448, 3);
        if(this.mutedEffects) this.player.setMuteEffects(true);
        else this.player.setMuteEffects(false);
    }
}