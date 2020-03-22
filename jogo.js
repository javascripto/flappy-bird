//@ts-check
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// [Plano de Fundo]
const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  draw() {
    context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height);
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

// [Tela inicio GetReady]
const getReaydyMessage = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  x: (canvas.width / 2) -174 / 2,
  y: 50,
  draw() {
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    );
  },
};

// [Pássaro]
const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  x: 10,
  y: 50,
  gravity: 0.25,
  speed: 0,
  update() {
    this.speed += this.gravity;
    this.y += this.speed;
  },
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

// [Screens]
const Screens = {};

Screens.START = {
  draw() {
    background.draw();
    floor.draw();
    flappyBird.draw();
    getReaydyMessage.draw();
  },
  update() {}
};

Screens.GAME = {
  draw() {
    background.draw();
    floor.draw();
    flappyBird.draw();
  },
  update() {
    flappyBird.update();
  }
};

let activeScreen = {
  draw() {},
  update() {},
};

function changeToScreen(screen) {
  activeScreen = screen;
}

changeToScreen(Screens.START);

// [GameLoop]
(function loop() {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop);
})();
