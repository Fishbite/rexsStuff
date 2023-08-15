console.log("Grrr...!!!");

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

class Monster extends SpriteObject {
  constructor() {
    super();
    this.speed = 1;
    this.distanceCounter = 0;
  }
}

// --  main program
// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 704;
canvas.height = 512;

// object arrays
const sprites = [];
const assetsToLoad = [];
let assetsLoaded = 0;

//  background grid
// set up the grid sprite
const grid = new SpriteObject();
grid.sourceY = 64; // 2nd row of tilesheet
grid.sourceWidth = 704; // width of grid image on tilesheet
grid.sourceHeight = 512; // height of grid image on tilesheet
grid.width = 704;
grid.height = 512;
sprites.push(grid);

// monster
const monster = new Monster();
monster.sourceX = 192;

// give it a position divisible by 64
monster.x = 320;
monster.y = 256;

sprites.push(monster);

// load the tiilesheet image
let image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "./images/monsterTileSheet06.svg";
assetsToLoad.push(image);

// game states
let loading = 0;
let playing = 1;
let gameState = loading;

update();

function update() {
  requestAnimationFrame(update, canvas);

  // change what the game is doing based on the game state
  switch (gameState) {
    case loading:
      console.log("loading...");
      break;

    case playing:
      playGame();
      break;
  }

  // render the game
  render();
}

function playGame() {
  monster.x += monster.vx;
  monster.y += monster.vy;
  monster.distanceCounter += monster.speed;

  // check if the monster is at a grid celll corner
  if (Math.floor(monster.x) % 64 === 0 && Math.floor(monster.y) % 64 === 0) {
    // if its at a corner, change direction
    changeDirection(monster);
  }

  // check the monster's screen boundaries
  if (monster.x < 0) {
    monster.x = 0;
    changeDirection(monster);
  }

  if (monster.y < 0) {
    monster.y = 0;
    changeDirection(monster);
  }

  if (monster.x + monster.width > canvas.width) {
    monster.x = canvas.width - monster.width;
    changeDirection(monster);
  }

  if (monster.y + monster.height > canvas.height) {
    monster.y = canvas.height - monster.height;
    changeDirection(monster);
  }

  function changeDirection(monster) {
    const up = 1;
    const down = 2;
    const left = 3;
    const right = 4;

    const direction = Math.ceil(Math.random() * 7);
    // console.log(direction);

    if (direction < 5) {
      switch (direction) {
        case right:
          monster.vx = monster.speed;
          monster.vy = 0;
          monster.sourceX = 128; // set img location on tilesheet
          break;

        case left:
          monster.vx = -monster.speed;
          monster.vy = 0;
          monster.sourceX = 64; // set img location on tilesheet
          break;

        case up:
          monster.vx = 0;
          monster.vy = -monster.speed;
          monster.sourceX = 0; // set img location on tilesheet
          break;

        case down:
          monster.vx = 0;
          monster.vy = monster.speed;
          monster.sourceX = 192; // set img location on tilesheet
      }
    }
  }
}

function loadHandler() {
  assetsLoaded++;
  if (assetsLoaded === assetsToLoad.length) {
    gameState = playing;
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
}
