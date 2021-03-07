import Player from "./player.js";
export default class John extends Player {

  constructor(scene, x, y, maxLife) {

    super(scene, x, y, maxLife, 'johnSpriteSheet', 0);

    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);
    this.on('animationcomplete', this.animComplete, this);
    this.on('animationstart', this.animStart, this);

    this.scene.players.push(this);
    scene.add.existing(this);
  }



  crearAnimaciones(scene) {
    scene.anims.create({
      key: "stopJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "walkJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: "fallJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 13, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 12, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "attackJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: 0
    });

    scene.anims.create({
      key: "hurtJohn",
      frames: scene.anims.generateFrameNumbers('johnSpriteSheet', { start: 14, end: 14 }),
      frameRate: 2,
      repeat: 0
    });
  }

  animComplete(animation, frame, sprite) {
    if (animation.key === "hurtJohn") this.isHurt = false;
  }

  animStart(animation, frame, sprite) {
    if (!this.mutedEffects) {
      if (animation.key === "attackJohn") {
        this.scene.soundAttackJohn1.play();
        this.scene.soundAttackJohn2.play();
      }
      else if (animation.key === "jumpJohn") this.scene.soundJumpJohn.play();
      else if (animation.key === "hurtJohn") this.scene.soundHurtJohn.play();
    }
  }

  crearFisicas(scene, x, y) {

    let M = Phaser.Physics.Matter.Matter;
    let w = this.width;
    let h = this.height;

    this.sensores = { bottom: null, hitbox: null };
    this.sensores.hitbox = M.Bodies.rectangle(w * 0.33, 0, 60, 50, { isSensor: true, isStatic: true });
    this.sensores.bottom = M.Bodies.rectangle(0, h * 0.45, 50, 5, { isSensor: true, isStatic: true });
    this.bodyPropio = M.Bodies.rectangle(0, 0, w * 0.47, h * 0.75, { chamfer: { radius: 10 } });
    this.finalBody = M.Body.create({
      parts: [this.bodyPropio, this.sensores.hitbox, this.sensores.bottom]
    });

    this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.7)
      .setFriction(0)
      .setFixedRotation()
      .setPosition(x, y);

    this.scene.matter.world.on('beforeupdate', function (event) {
      this.touchingFloor = false;
      this.isBlocked = false;
    }, this);

    this.scene.matter.world.on('collisionactive', function (event) {
      let playerBody = this.bodyPropio;
      let bottom = this.sensores.bottom;
      let hitbox = this.sensores.hitbox;

      for (var i = 0; i < event.pairs.length; i++) {
        let bodyA = event.pairs[i].bodyA;
        let bodyB = event.pairs[i].bodyB;
        if ((bodyA === bottom && !bodyB.isSensor) || (bodyB === bottom && !bodyA.isSensor)) this.touchingFloor = true;
        if (bodyA === hitbox && !this.scene.esLanza(bodyB) && !this.scene.esEnemigo(bodyB) || bodyB === hitbox && !this.scene.esLanza(bodyA) && !this.scene.esEnemigo(bodyA)) this.isBlocked = true;
      }
    }, this);
  }

  playAttack() {
    this.play("attackJohn", true);
  }

  playStop() {
    this.play("stopJohn", true);
  }

  playWalk() {
    this.play("walkJohn", true);
  }

  playJump() {
    this.play("jumpJohn", true);

  }

  playFall() {
    this.play("fallJohn", true);
  }

  playHurt() {
    this.isHurt = true;
    this.play("hurtJohn", true);
  }
}