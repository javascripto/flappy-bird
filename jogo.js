//@ts-check
const sprites = new Image();
sprites.src = './sprites.png';

const sound_HIT = new Audio('./sounds/hit.wav');

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
let flappyBird = flappyBirdFactory();

function flappyBirdFactory() {
  const _flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    speed: 0,
    jumpSize: 4.6,
    jump() {
      this.y = this.y - 40;
      this.speed = - this.jumpSize;
    },
    update() {
      if (colides(this, floor)) {
        sound_HIT.play();
        setTimeout(() => changeToScreen(Screens.START), 500);
        return;
      }
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
  return _flappyBird;
}


// [Screens]
const Screens = {};

let activeScreen = {
  draw() {},
  update() {},
};

function changeToScreen(screen) {
  activeScreen = screen;

  if (activeScreen.init) {
    activeScreen.init();
  }
}

Screens.START = {
  init() {
    flappyBird = flappyBirdFactory();
  },
  draw() {
    background.draw();
    floor.draw();
    flappyBird.draw();
    getReaydyMessage.draw();
  },
  update() {},
  click() {
    changeToScreen(Screens.GAME);
  },
};

Screens.GAME = {
  draw() {
    background.draw();
    floor.draw();
    flappyBird.draw();
  },
  click() {
    flappyBird.jump();
  },
  update() {
    flappyBird.update();
  }
};

function colides(bird, floor) {
  const birdY = bird.y + bird.height;
  return birdY >= floor.y;
}

// [GameLoop]
function loop() {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

// [Start]
changeToScreen(Screens.START);
loop();
