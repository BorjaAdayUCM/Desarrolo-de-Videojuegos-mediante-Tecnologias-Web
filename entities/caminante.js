export default class Caminante extends Phaser.Physics.Matter.Sprite {

  constructor(scene, x, y) {

    super(scene.matter.world, x, y, "caminanteSpriteSheet", 0);

    this.contador = 0;
    this.scene = scene;
    this.touchingFloor = false;
    this.touchingLateral = false;
    this.speed = 0.3;
    this.isDead = false;

    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);

    this.play("walkCaminante", true);
    Phaser.Physics.Matter.Matter.Body.scale(this.finalBody, -1, 1);

    this.on('animationcomplete', this.animComplete, this);

    this.scene.enemigos.push(this);
    scene.add.existing(this);
  }

  animComplete(animation, frame, sprite) {
    if (animation.key === "muerteCaminante") {
      this.scene.borraEnemigo(this.bodyPropio);
    }
  }

  playMuerte() {
    this.isDead = true;
    this.setVelocityX(0);
    this.body.destroy();
    this.play('muerteCaminante', true);
    this.scene.score += 100;
    if(this.scene.score >= 9999) this.scene.score = 9999;
    this.scene.scoreText.setText("Score: " + this.scene.score);
  }

  crearAnimaciones(scene) {
    scene.anims.create({
      key: "walkCaminante",
      frames: scene.anims.generateFrameNumbers("caminanteSpriteSheet", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    scene.anims.create({
      key: "muerteCaminante",
      frames: scene.anims.generateFrameNumbers("caminanteSpriteSheet", { start: 4, end: 13 }),
      frameRate: 7,
      repeat: 0
    });
  }

  crearFisicas(scene, x, y) {

    let M = Phaser.Physics.Matter.Matter;
    let w = this.width;
    let h = this.height;
    this.bodyPropio = M.Bodies.rectangle(- 85, 0, h * 0.6, w * 0.63, { chamfer: { radius: 10 } });
    this.sensores = { lateral: null, bottom: null };
    this.sensores.lateral = M.Bodies.rectangle(-85, 0.5, 75, h * 0.65, { isSensor: true, isStatic: true });
    this.sensores.bottom = M.Bodies.rectangle(-85, 50, 5, 5, { isSensor: true, isStatic: true });

    this.finalBody = M.Body.create({
      parts: [this.bodyPropio, this.sensores.lateral, this.sensores.bottom]
    });

    this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.72)
      .setFriction(0)
      .setFixedRotation()
      .setPosition(x, y)

    this.scene.matter.world.on('beforeupdate', function (event) {
      this.touchingFloor = false;
      this.touchingLateral = false;
    }, this);

    this.scene.matter.world.on('collisionactive', function (event) {
      let playerBody = this.bodyPropio;
      let bottom = this.sensores.bottom;
      let lateral = this.sensores.lateral;

      if(this.scene != undefined) {
        for (var i = 0; i < event.pairs.length; i++) {
          let bodyA = event.pairs[i].bodyA;
          let bodyB = event.pairs[i].bodyB;
          if ((bodyA === lateral && !this.scene.esPlayer(bodyB) && !this.scene.esLanza(bodyB)) || (bodyB === lateral && !this.scene.esPlayer(bodyA) && !this.scene.esLanza(bodyA))) {
            this.touchingLateral = true;
          }
          if ((bodyA === bottom || bodyB === bottom)) this.touchingFloor = true;
        }
      }
      
    }, this);

  }

  playerController() {
    this.contador++;
    if (this.touchingFloor && !this.touchingLateral) {
      if (!this.flipX) this.setVelocityX(this.speed);
      else this.setVelocityX(-this.speed);
    }
    else if (this.contador > 50) {
      if (!this.flipX) {
        this.setFlipX(true);
        this.setVelocityX(-this.speed);
      }
      else {
        this.setFlipX(false);
        this.setVelocityX(this.speed);
      }
      Phaser.Physics.Matter.Matter.Body.scale(this.finalBody, -1, 1);
      this.contador = 0;
    }
    this.setFixedRotation();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if(!this.isDead) this.playerController();
  }

}