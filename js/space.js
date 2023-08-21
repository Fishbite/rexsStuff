console.log("Out of this world dude!!!");

class SpriteObject {
  constructor() {
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 64;
    this.sourceHeight = 64;
    this.width = 64;
    this.height = 64;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.visible = true;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  get halfWidth() {
    return this.width / 2;
  }

  get halfHeight() {
    return this.height / 2;
  }
}

//  ****** Main Program ******
// the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 400;
canvas.style.backgroundColor = "rgb(100, 50, 50)";

// array to store sprites
const sprites = [];

// the background sprite
const bg = new SpriteObject();
bg.sourceY = 68;
bg.sourceWidth = 4320;
bg.sourceHeight = 2156;
bg.width = 4320;
bg.height = 2156;
bg.x = 0;
bg.y = 0;
sprites.push(bg);

// the world and camera objects
const gameWorld = {
  x: 0,
  y: 0,
  width: bg.width,
  height: bg.height,
};

const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,

  // camera inner scroll boundaries
  //   getters
  rightInnerBound: function () {
    return this.x + this.width * 0.75;
  },
  leftInnerBound: function () {
    return this.x + this.width * 0.25;
  },
  topInnerBound: function () {
    return this.y + this.height * 0.25;
  },
  bottomInnerBound: function () {
    return this.y + this.height * 0.75;
  },
};

// center the camera over the gameWorld
camera.x = gameWorld.x + gameWorld.width / 2 - camera.width / 2;
camera.y = gameWorld.y + gameWorld.height / 2 - camera.height / 2;

// create the monster sprite and center it
const monster = new SpriteObject();
monster.sourceY = 2;
monster.x = gameWorld.x + gameWorld.width / 2 - monster.width / 2;
monster.y = gameWorld.y + gameWorld.height / 2 - monster.height / 2;
sprites.push(monster);

// load image
const image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "./images/spritesheet.png";

//Arrow key codes
const UP = "ArrowUp";
const DOWN = "ArrowDown";
const RIGHT = "ArrowRight";
const LEFT = "ArrowLeft";

//Directions
let moveUp = false;
let moveDown = false;
let moveRight = false;
let moveLeft = false;

//Add keyboard listeners
window.addEventListener(
  "keydown",
  function (event) {
    console.log(event.key);
    switch (event.key) {
      case UP:
        moveUp = true;
        break;

      case DOWN:
        moveDown = true;
        break;

      case LEFT:
        moveLeft = true;
        break;

      case RIGHT:
        moveRight = true;
        break;
    }
  },
  false
);

window.addEventListener(
  "keyup",
  function (event) {
    // console.log(event.key);
    switch (event.key) {
      case UP:
        moveUp = false;
        break;

      case DOWN:
        moveDown = false;
        break;

      case LEFT:
        moveLeft = false;
        break;

      case RIGHT:
        moveRight = false;
        break;
    }
  },
  false
);

function loadHandler() {
  update();
}

function update() {
  requestAnimationFrame(update, canvas);

  //   up
  if (moveUp && !moveDown) {
    monster.vy = -5;
  }
  //   down
  if (moveDown && !moveUp) {
    monster.vy = 5;
  }
  //   left
  if (moveLeft && !moveRight) {
    monster.vx = -5;
  }
  if (moveRight && !moveLeft) {
    monster.vx = 5;
  }

  //   set the monster's velocity to 0 if none of the keys are being pressed
  if (!moveUp && !moveDown) {
    monster.vy = 0;
  }

  if (!moveLeft && !moveRight) {
    monster.vx = 0;
  }

  //Move the monster and keep it inside the gameWorld boundaries
  monster.x = Math.max(
    0,
    Math.min(monster.x + monster.vx, gameWorld.width - monster.width)
  );
  monster.y = Math.max(
    0,
    Math.min(monster.y + monster.vy, gameWorld.height - monster.height)
  );

  //Scroll the camera
  if (monster.x < camera.leftInnerBound()) {
    camera.x = Math.floor(monster.x - camera.width * 0.25);
  }
  if (monster.y < camera.topInnerBound()) {
    camera.y = Math.floor(monster.y - camera.height * 0.25);
  }
  if (monster.x + monster.width > camera.rightInnerBound()) {
    camera.x = Math.floor(monster.x + monster.width - camera.width * 0.75);
  }
  if (monster.y + monster.height > camera.bottomInnerBound()) {
    camera.y = Math.floor(monster.y + monster.height - camera.height * 0.75);
  }

  //The camera's world boundaries
  if (camera.x < gameWorld.x) {
    camera.x = gameWorld.x;
  }
  if (camera.y < gameWorld.y) {
    camera.y = gameWorld.y;
  }
  if (camera.x + camera.width > gameWorld.x + gameWorld.width) {
    camera.x = gameWorld.x + gameWorld.width - camera.width;
  }
  if (camera.y + camera.height > gameWorld.height) {
    camera.y = gameWorld.height - camera.height;
  }

  //   console.log(monster.x, monster.y);

  render();
}

// function to draw all the sprites
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  //   move the canvas context so that it's positioned relative to the camera
  ctx.translate(-camera.x, -camera.y);

  // display the sprites
  if (sprites.length !== 0) {
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      // console.log(sprite);
      if (sprite.visible) {
        // console.log(sprite.sourceX, sprite.sourceY, sprite.sourceWidth);
        ctx.drawImage(
          image,
          sprite.sourceX,
          sprite.sourceY,
          sprite.sourceWidth,
          sprite.sourceHeight,
          Math.floor(sprite.x),
          Math.floor(sprite.y),
          sprite.width,
          sprite.height
        );
      }
    }
  }

  ctx.restore();
}
