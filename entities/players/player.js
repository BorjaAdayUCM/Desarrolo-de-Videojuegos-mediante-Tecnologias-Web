
export default class Player extends Phaser.Physics.Matter.Sprite {

  constructor(scene, x, y, maxLife, spriteSheet, num) {

    super(scene.matter.world, x, y, spriteSheet, num);

    this.scene = scene;
    this.speed = 3;
    this.jumpSpeed = 6;
    this.isAttacking = false;
    this.isBlocked = false;
    this.maxLife = maxLife;
    this.life = this.maxLife;
    this.touchingFloor = false;
    this.isHurt = false;
    this.mutedEffects = false;
    this.powerUpEscudo = false;
    this.powerUpSalto = false;
    this.powerUpVida = false;
    this.isDead = false;
  }

  moveRigth() {
    this.setVelocityX(this.speed);
    if (this.flipX) {
      Phaser.Physics.Matter.Matter.Body.scale(this.finalBody, -1, 1, { x: this.body.position.x + 2, y: this.body.position.y });
      this.setFixedRotation();
    }
    this.setFlipX(false);
    this.isAttacking = false;
  }

  moveLeft() {
    this.setVelocityX(-this.speed);
    if (!this.flipX) {
      Phaser.Physics.Matter.Matter.Body.scale(this.finalBody, -1, 1, { x: this.body.position.x - 2, y: this.body.position.y });
      this.setFixedRotation();
    }
    this.setFlipX(true);
    this.isAttacking = false;
  }

  attack() {
    this.setVelocityX(0);
    this.isAttacking = true;
  }

  jump() {
    if(this.powerUpSalto) this.setVelocityY(-this.jumpSpeed - 3);
    else this.setVelocityY(-this.jumpSpeed);
    this.isAttacking = false;
  }

  fall() {
    this.isAttacking = false;
  }

  stop() {
    this.setVelocityX(0);
    this.isAttacking = false;
  }

  playerController() {
    if (!this.isHurt) {
      if (this.scene.keyJump.isDown && this.touchingFloor) {
        this.jump();
      }
      else if (this.scene.keyAttack.isDown) {
        this.attack();
      }
      else if (this.scene.keyRight.isDown) {
        this.moveRigth();
      }
      else if (this.scene.keyLeft.isDown) {
        this.moveLeft();
      }
      else {
        this.stop();
      }
    }
  }

  animationsController() {
    if (!this.isHurt) {
      if (this.isAttacking) {
        this.playAttack();
      }
      else {
        if (this.touchingFloor) {
          if (this.body.velocity.x == 0) {
            this.playStop();
          }
          else {
            this.playWalk();
          }
        }
        else {
          if (this.body.velocity.y < 0) {
            this.playJump();
          }
          else {
            this.fall();
            this.playFall();
          }
        }
      }
    }
  }

  heridoJugador(dir) {
    if (this.powerUpEscudo) {
      this.powerUpEscudo = false;
    }
    else {
      if (this.life == 3) this.scene.corazon3.setVisible(false);
      else if (this.life == 2) this.scene.corazon2.setVisible(false);
      else this.scene.corazon3.setVisible(false);
      this.life--;
      if (this.life > 0) {
        this.playHurt();
        if (dir === 'left') this.setVelocityX(-2);
        else this.setVelocityX(2);
      }
      else {
        this.isDead = true;
        this.scene.siguientePersonaje();
      }
    }
    this.scene.pocionEscudo.setVisible(false);
    this.scene.pocionSalto.setVisible(false);
    this.scene.pocionVida.setVisible(false);
    this.powerUpEscudo = false;
    this.powerUpSalto = false;
    this.powerUpVida = false;
  }

  setMuteEffects(boolean) {
    this.mutedEffects = boolean;
  }

  setMaxVida() {
    this.life = this.maxLife;
    this.scene.corazon1.setVisible(true);
    this.scene.corazon2.setVisible(true);
    this.scene.corazon3.setVisible(true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.playerController();
    this.animationsController();
  }

}