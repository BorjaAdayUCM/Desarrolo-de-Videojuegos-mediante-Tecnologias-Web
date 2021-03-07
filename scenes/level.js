import GameOver from "./gameover.js";

export default class level extends Phaser.Scene {

    init(data) {
        if(Object.entries(data).length > 0) {
            this.mutedMusic = data.mutedMusic;
            this.mutedEffects = data.mutedEffects;
            this.score = data.score;
            this.scoreInicial = data.score;
            this.checkpointX = data.checkpointX;
        }
    }

    preload() {
        this.enemigos = [];
        this.lanzas = [];
        this.backgrounds = [];
        this.players = [];
    }

    update(time, delta) {
        this.updateBackgrounds();
    }

    updateBackgrounds() {
            if (this.player.body.velocity.x > 0.1 && !this.player.isBlocked && this.player.body.position.x > this.game.config.width / 2 
                && this.player.body.position.x < this.map.widthInPixels - this.game.config.width / 2) {
                for (let i = 0; i < this.backgrounds.length; i++) {
                    this.backgrounds[i].tilePositionX += i * 0.25;
                }
            }
            else if (this.player.body.velocity.x < -0.1 && !this.player.isBlocked && this.player.body.position.x > this.game.config.width / 2 
                && this.player.body.position.x < this.map.widthInPixels - this.game.config.width / 2) {
                for (let i = 0; i < this.backgrounds.length; i++) {
                    this.backgrounds[i].tilePositionX -= i * 0.25;
                }
            }
    }

    create() {
        this.creaMusica();
        this.cargaMapayFondos();
        this.crearMapa();
        this.crearPocion();
        this.crearEnemigos();
        this.crearJugadores();
        this.crearCamara();
        this.crearControles();
        this.crearModoDebug();
        this.crearMenu();
        this.crearColisiones();
        this.crearBarra();
        this.personalizaBarra();
        this.crearCambioPersonajes();
    }

    creaMusica() {
        this.musica = this.sound.add("levelSound", {volume: 0.2});
        this.soundAttackJohn1 = this.sound.add("attackJohn1", {volume: 1});
        this.soundAttackJohn2 = this.sound.add("attackJohn2", {volume: 1});
        this.soundHurtJohn = this.sound.add('hurtJohn', {volume: 1});
        this.soundJumpJohn = this.sound.add('jumpJohn', {volume: 1});
        this.soundAttackDaenerys = this.sound.add('attackDaenerys', {volume: 1});
        this.soundHurtDaenerys = this.sound.add('hurtDaenerys', {volume: 1});
        this.soundJumpDaenerys = this.sound.add('jumpDaenerys', {volume: 1});

        this.musica.loop = true;
        this.musica.play();
        if(this.mutedMusic) this.musica.pause();
    }

    crearMapa() {
        
        if(this.mutedMusic) this.musica.pause();

        const tiles4 = this.map.addTilesetImage("Floor0","Floor0");
        const tiles5 = this.map.addTilesetImage("Floor1","Floor1");
        const tiles6 = this.map.addTilesetImage("Details0","Details0");
        const tiles7 = this.map.addTilesetImage("Details1","Details1");
        const tiles8 = this.map.addTilesetImage("Details2","Details2");

        let posY = 0;
        this.worldLayerDetails0 = this.map.createStaticLayer("Details0", tiles6, 0, posY);
        this.worldLayerDetails1 = this.map.createStaticLayer("Details1", tiles7, 0, posY);
        this.worldLayerDetails2 = this.map.createStaticLayer("Details2", tiles8, 0, posY);
        this.worldLayerFloor0 = this.map.createStaticLayer("Floor0", tiles4, 0, posY);
        this.worldLayerFloor1 = this.map.createStaticLayer("Floor1", tiles5, 0, posY);
        this.worldLayerDetails2.setDepth(1);

        this.worldLayerFloor0.setCollisionByProperty({ collides: true });
        this.worldLayerFloor1.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.worldLayerFloor0);
        this.matter.world.convertTilemapLayer(this.worldLayerFloor1);
        
        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, 32, true, true, false, false);

        const deadZone = this.map.findObject("DeadZone", obj => obj.name === "DeadZone");
        this.deadZone =  this.matter.add.rectangle(deadZone.x + (deadZone.width / 2), deadZone.y + (deadZone.height / 2), deadZone.width, deadZone.height, { isSensor: true });
        this.deadZone.ignoreGravity = true;

        const finalZone =  this.map.findObject("FinalZone", obj => obj.name === "FinalZone");
        this.finalZone =  this.matter.add.rectangle(finalZone.x + (finalZone.width / 2), finalZone.y + (finalZone.height / 2), finalZone.width, finalZone.height, { isSensor: true });
        this.finalZone.ignoreGravity = true;
    }

    crearCamara() {
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    }

    crearControles() {
        this.keyRight = this.input.keyboard.addKey('D');
        this.keyLeft = this.input.keyboard.addKey('A');
        this.keyJump = this.input.keyboard.addKey('W');
        this.keyAttack = this.input.keyboard.addKey('K');
        this.keyJohn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyDaenerys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyAria = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    }

    crearModoDebug() {
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;
        this.input.keyboard.on("keydown_B", event => {
            this.matter.world.drawDebug = !this.matter.world.drawDebug;
            this.matter.world.debugGraphic.clear();
        });
    }

    crearMenu() {
        this.input.keyboard.on("keydown_P", event => {
            this.scene.get('menu').setNivelActual(this.nombreNivel);
            this.scene.get('menu').setMuteds(this.mutedMusic, this.mutedEffects);
            this.scene.switch('menu', this.nombreNivel);
        });
    }

    crearCambioPersonajes() {
        this.input.keyboard.on("keydown_ONE", event => {
            if(!this.players[0].isDead && this.player !== this.players[0]) this.cambiaPersonaje(0);
        });
        
        this.input.keyboard.on("keydown_TWO", event => {
            if(!this.players[1].isDead && this.player !== this.players[1]) this.cambiaPersonaje(1);
        });

        this.input.keyboard.on("keydown_THREE", event => {

        });
    }

    crearBarra() {
        this.add.image(500.0, 560.0, "barra_vacia").setScrollFactor(0);
		this.corazon1 = this.add.image(58.5, 565.0, "corazon").setScrollFactor(0);
		this.corazon2 = this.add.image(139.5, 565.0, "corazon").setScrollFactor(0);
		this.corazon3 = this.add.image(220.5, 565.0, "corazon").setScrollFactor(0);
		this.johnOn = this.add.image(370.0, 561.0, "john_circulo_on").setScrollFactor(0);
		this.johnOff = this.add.image(370.0, 561.0, "john_circulo_off").setScrollFactor(0);
		this.daenerysOn = this.add.image(457.0, 561.0, "daenerys_circulo_on").setScrollFactor(0);
		this.daenerysOff = this.add.image(457.0, 561.0, "daenerys_circulo_off").setScrollFactor(0);
		this.ariaOn = this.add.image(546.0, 561.0, "aria_circulo_on").setScrollFactor(0);
		this.ariaOff = this.add.image(546.0, 561.0, "aria_circulo_off").setScrollFactor(0);
        this.pocionEscudo = this.add.image(715.0, 561.0, "pocion_escudo_barra").setScale(1.2, 1.2).setScrollFactor(0).setVisible(false);
		this.pocionSalto = this.add.image(715.0, 561.0, "pocion_salto_barra").setScale(1.2, 1.2).setScrollFactor(0).setVisible(false);
		this.pocionVida = this.add.image(715.0, 561.0, "pocion_vida_barra").setScale(1.2, 1.2).setScrollFactor(0).setVisible(false);
		this.scoreText = this.add.text(770.0, 545.0, "Score: " + this.score, {}).setScale(2.0871367, 2.2409885).setScrollFactor(0);
    }

    esAlgunPlayer(body) {
        for(let i = 0; i < this.players.length; i++) {
            if(body === this.players[i].bodyPropio || body === this.players[i].sensores.bottom || body === this.players[i].sensores.hitbox) return true; 
        }
        return false;
    }

    esPlayer(body) {
        return body === this.player.bodyPropio || body === this.player.sensores.bottom || body === this.player.sensores.hitbox;
    }

    esSensorPlayer(body) {
        return body === this.player.sensores.bottom || body === this.player.sensores.hitbox;
    }

    esBodyPlayer(body) {
        return body === this.player.bodyPropio;
    }

    esHitboxPlayer(body) {
        return body === this.player.sensores.hitbox;
    }

    borraLanza(body) {
        for(let i = 0; i < this.lanzas.length; i++) {
            if(body === this.lanzas[i].bodyPropio) {
                this.lanzas[i].destroy();
                this.lanzas.splice(i, 1);
                return;
            }
        }
    }

    borraEnemigo(body) {
        for(let i = 0; i < this.enemigos.length; i++) {
            if(body === this.enemigos[i].bodyPropio) {

                this.enemigos[i].destroy();
                this.enemigos.splice(i, 1);
                return;
            }
        }
    }

    esSensorEnemigo(body) {
        for (let i = 0; i < this.enemigos.length; i++){
            if(this.enemigos[i].sensores != undefined && this.enemigos[i].sensores.lateral != undefined && this.enemigos[i].sensores.lateral != undefined) {
                if(body === this.enemigos[i].sensores.lateral || body === this.enemigos[i].sensores.bottom) return true;
            }
        }
        return false;
    }

    esEnemigo(body) {
        for (let i = 0; i < this.enemigos.length; i++){
            if (body === this.enemigos[i].bodyPropio) return true;
        }
        return false;
    }

    getEnemigo(body) {
        for (let i = 0; i < this.enemigos.length; i++){
            if (body === this.enemigos[i].bodyPropio) return this.enemigos[i];
        }
        return null;
    }

    esLanza(body) {
        for (let i = 0; i < this.lanzas.length; i++) {
            if (body === this.lanzas[i].bodyPropio) return true;
        }
        return false;
    }

    getLanza(body) {
        for (let i = 0; i < this.lanzas.length; i++) {
            if (body === this.lanzas[i].bodyPropio) return this.lanzas[i];
        }
        return null;
    }

    esDeadZone(body) {
        return body === this.deadZone;
    }

    updateInfo(data) {
        this.mutedMusic = data.mutedMusic;
        this.mutedEffects = data.mutedEffects;
    }

    esCheckpoint(body) {
        if(this.checkpoint != undefined && this.checkpoint.bodyPropio === body) return true;
        else return false;
    }

    gameOver() {
        this.musica.pause();
        this.scene.start('gameover', {mutedMusic: this.mutedMusic, nombreNivel: this.nombreNivel, mutedEffects: this.mutedEffects, score: this.scoreInicial, checkpointX: this.checkpointX});
    }

    pasarDeNivel() {
        this.musica.pause();
        this.scene.start(this.siguienteNivel, {mutedMusic: this.mutedMusic, mutedEffects: this.mutedEffects, score: this.score, checkpointX: 100});
    }

    herirJugador(bodyA, bodyB) {
        let dir;
        let enemigo, player;
        player = this.player.body;
        if(this.esLanza(bodyA) || this.esEnemigo(bodyA)) {
            if(this.esLanza(bodyA)) enemigo = this.getLanza(bodyA);
            else enemigo = this.getEnemigo(bodyA);
            enemigo = this.getEnemigo(bodyA);
            if(player.velocity.x === 0)  dir = enemigo.body.velocity.x;
            else {
                if((player.velocity.x > 0 && enemigo.body.velocity.x > 0) || (player.velocity.x < 0 && enemigo.body.velocity.x < 0)) { 
                 if(this.esEnemigo(bodyA)) dir = -enemigo.body.velocity.x;
                 else dir = enemigo.body.velocity.x;
                } 
                else if((player.velocity.x > 0 && enemigo.body.velocity.x < 0) || (player.velocity.x < 0 && enemigo.body.velocity.x > 0)) dir = enemigo.body.velocity.x;
            }
        }
        else {
            if(this.esLanza(bodyB)) enemigo = this.getLanza(bodyB);
            else enemigo = this.getEnemigo(bodyB);
            if(player.velocity.x === 0)  dir = enemigo.body.velocity.x;
            else {
                if((enemigo.body.velocity.x > 0 && player.velocity.x > 0) || (enemigo.body.velocity.x < 0 && player.velocity.x < 0)) {
                    if(this.esEnemigo(bodyB)) dir = -enemigo.body.velocity.x;
                    else dir = enemigo.body.velocity.x;
                }
                else if((player.velocity.x > 0 && enemigo.body.velocity.x < 0) || (player.velocity.x < 0 && enemigo.body.velocity.x > 0)) dir = enemigo.body.velocity.x;
            }
        }
        if(this.player.life === 1 && !this.player.pocionEscudo) this.borraEnemigo(enemigo.bodyPropio);
        if(dir > 0) this.player.heridoJugador('right');
        else this.player.heridoJugador('left');
    }

    crearColisiones() {
        this.matter.world.on('collisionstart', function (event) {
            for(let i = 0; i< event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA, bodyB = event.pairs[i].bodyB;

                //Destruir proyectiles
                if(this.esLanza(bodyA) || this.esLanza(bodyB)){
                    if(this.esBodyPlayer(bodyA) || this.esBodyPlayer(bodyB)) {
                        this.herirJugador(bodyA, bodyB);
                    }
                    if(this.esLanza(bodyA) && !this.esEnemigo(bodyB) && !this.esSensorPlayer(bodyB) && !this.esSensorEnemigo(bodyB)) this.borraLanza(bodyA);
                    else if (this.esLanza(bodyB) && !this.esEnemigo(bodyA) && !this.esSensorPlayer(bodyA) && !this.esSensorEnemigo(bodyA)) this.borraLanza(bodyB)
                }
    
                //Matar Player
                if(this.esBodyPlayer(bodyA) || this.esBodyPlayer(bodyB)) {
                    if(bodyA === this.deadZone || bodyB === this.deadZone)  this.gameOver();
                    else if(this.esEnemigo(bodyA) || this.esEnemigo(bodyB)) this.herirJugador(bodyA, bodyB);

                }

                //PowerUps
                if(this.esBodyPlayer(bodyA) || this.esBodyPlayer(bodyB)) {
                    if(bodyA === this.powerUp.bodyPropio || bodyB === this.powerUp.bodyPropio) {
                        if(this.powerUp.tipoPocion === 'escudo') {
                            this.player.powerUpEscudo = true;
                            this.pocionEscudo.setVisible(true);
                        }
                        else if(this.powerUp.tipoPocion === 'salto') {
                            this.player.powerUpSalto = true;
                            this.pocionSalto.setVisible(true);
                        }
                        else if(this.powerUp.tipoPocion === 'vida') {
                            this.player.powerUpVida = true;
                            this.player.setMaxVida();
                            this.pocionVida.setVisible(true);
                        }
                        this.powerUp.destroy();
                    }
                }

                //Paso de nivel
                if(this.esBodyPlayer(bodyA) || this.esBodyPlayer(bodyB)) {
                    if(bodyA === this.finalZone || bodyB === this.finalZone) {
                        this.pasarDeNivel();
                    }
                }

                //Checkpoint
                if(this.esBodyPlayer(bodyA) || this.esBodyPlayer(bodyB)) {
                    if(this.esCheckpoint(bodyA) || this.esCheckpoint(bodyB)) {
                        this.checkpointX = this.checkpoint.body.position.x;
                    }
                }

            }
    
          },this)

          this.matter.world.on('collisionactive', function (event) {
            for(let i = 0; i< event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA, bodyB = event.pairs[i].bodyB;
                //Matar enemigos
                if ((this.esHitboxPlayer(bodyA) || this.esHitboxPlayer(bodyB)) && this.player.isAttacking) {
                    if(this.esEnemigo(bodyA)) this.getEnemigo(bodyA).playMuerte();
                    else if(this.esEnemigo(bodyB)) this.getEnemigo(bodyB).playMuerte();
                }
            }
    
          },this)
    }

    actualizarBarra() {
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].isDead) {
                if(i === 0)  this.johnOff.setVisible(true);
                else if(i === 1) this.daenerysOff.setVisible(true);
                else if(i === 2) this.ariaOff.setVisible(true);
            }
        }
        if(this.player.life === 3) {
            this.corazon1.setVisible(true);
            this.corazon2.setVisible(true);
            this.corazon3.setVisible(true);
        }
        else if(this.player.life === 2) {
            this.corazon1.setVisible(true);
            this.corazon2.setVisible(true);
            this.corazon3.setVisible(false);
        }
        else if (this.player.life === 1) {
            this.corazon1.setVisible(true);
            this.corazon2.setVisible(false);
            this.corazon3.setVisible(false);
        }
        this.pocionEscudo.setVisible(this.player.powerUpEscudo);
        this.pocionSalto.setVisible(this.player.powerUpSalto);
        this.pocionVida.setVisible(this.player.powerUpVida);
    }

    cambiaPersonaje(i) {
        let xFinal = this.player.body.position.x, yFinal = this.player.body.position.y;
        this.player.setPosition(this.players[i].body.position.x, this.players[i].body.position.y);
        this.players[i].setPosition(xFinal, yFinal);

        this.player.active = false;
        this.player.setVisible(false);

        this.players[i].active = true;
        this.players[i].setVisible(true);

        this.player = this.players[i];
        this.camera.startFollow(this.player);
                
        this.actualizarBarra();
    }

    siguientePersonaje() {
        for(let i = 0; i < this.players.length; i++) {
            if(!this.players[i].isDead) {
                this.cambiaPersonaje(i);
                return;
            }
        }
        this.gameOver();
    }

    iniciaMusica() {
        if(this.musica != undefined) this.musica.resume();
        this.mutedMusic = false;
    }

    detieneMusica() {
        if(this.musica != undefined) this.musica.pause();
        this.mutedMusic = true;
    }

    iniciaEfectos() {
        this.player.setMuteEffects(false);
        this.mutedEffects = false;
    }

    detieneEfectos() {
        this.player.setMuteEffects(true);
        this.mutedEffects = true;
    }
}