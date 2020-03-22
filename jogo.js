//@ts-check
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// [Chão]
const floor = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,
  draw() {
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    );
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.width, this.height,
      (this.x + this.width), this.y,
      this.width, this.height,
    );
  }
};

// [Pássaro]
const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  x: 10,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    );
  }
};

(function loop() {
  floor.draw();
  flappyBird.draw();
  requestAnimationFrame(loop);
})();
