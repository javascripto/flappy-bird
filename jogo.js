//@ts-check
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

(function loop() {
  requestAnimationFrame(loop);
})();
