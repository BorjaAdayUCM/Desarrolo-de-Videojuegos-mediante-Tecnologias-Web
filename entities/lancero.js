import Lanza from "./lanza.js";

export default class Lancero extends Phaser.Physics.Matter.Sprite {

  constructor(scene, x, y) {

    super(scene.matter.world, x, y, "lanceroSpriteSheet", 0);

    this.scene = scene;
    this.contador = 0;
    this.isDead = false;

    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);

    this.on('animationcomplete', this.animComplete, this);
    this.play("attackLancero", true);
    this.setFlipX(false);

    this.scene.enemigos.push(this);
    
    scene.add.existing(this);
  }

  animComplete(animation, frame, sprite) {
    if (animation.key === "attackLancero" && !this.isDead) {
      this.play("stopLancero", true);
      new Lanza(this.scene, this.body.position.x, this.body.position.y - 36, !this.flipX);
    }
    else if (animation.key === "muerteLancero") {
      this.scene.borraEnemigo(this.bodyPropio);
    }
  }

  playMuerte() {
    this.isDead = true;
    this.setVelocityX(0);
    this.body.destroy();
    this.play('muerteLancero', true);
    this.scene.score += 130;
    if(this.scene.score >= 9999) this.scene.score = 9999;
    this.scene.scoreText.setText("Score: " + this.scene.score);
  }

  crearAnimaciones(scene) {
    scene.anims.create({
      key: "stopLancero",
      frames: scene.anims.generateFrameNumbers("lanceroSpriteSheet", { start: 7, end: 8 }),
      frameRate: 5,
      repeat: -1
    });

    scene.anims.create({
      key: "attackLancero",
      frames: scene.anims.generateFrameNumbers("lanceroSpriteSheet", { start: 0, end: 6 }),
      frameRate: 4,
      repeat: 0
    });

    scene.anims.create({
      key: "muerteLancero",
      frames: scene.anims.generateFrameNumbers("lanceroSpriteSheet", { start: 7, end: 12 }),
      frameRate: 5,
      repeat: 0
    });


  }

  crearFisicas(scene, x, y) {

    let M = Phaser.Physics.Matter.Matter;
    let w = this.width;
    let h = this.height;
    this.bodyPropio = M.Bodies.rectangle(0, 0, h * 0.6, w * 0.63, { chamfer: { radius: 10 } });

    this.finalBody = M.Body.create({
      parts: [this.bodyPropio]
    });

    this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.6)
      .setFriction(0)
      .setFixedRotation()
      .setPosition(x, y)
  }



  playerController() {
    if (this.scene.player.body.position.x < this.body.position.x) this.setFlipX(true);
    else this.setFlipX(false);
  }


  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (!this.isDead) {
      this.contador++;
      if (this.contador % 50 === 0) {
        this.contador = 0;
        this.play("attackLancero", true);
      }

      this.playerController();
      this.setVelocityX(0);
    }
    

  }
}