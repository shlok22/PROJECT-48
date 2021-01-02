var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backImg, bg;
var player, player_running;
var EnemyGroup, enemy_Img;
var BulletGroup, bullet_Img;
var bullet;
var score = 0;

function preload() {
  backImg = loadImage("bg.jpg");
  player_running = loadAnimation("player1.png", "player2.png", "player3.png");

  bullet_Img = loadImage("bullet1.png");
  enemy_Img = loadAnimation("enemy1.png", "enemy2.png", "enemy3.png");
}

function setup() {
  back = createSprite(20, 100, 800, 400);
  back.addImage("bg", backImg);
  back.velocityX = -5;
  player = createSprite(50, 350, 800, 10);
  player.addAnimation("player_running", player_running);
  player.scale = 0.5;
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = true;


  BulletGroup = new Group();
  EnemyGroup = new Group();

  score = 0;
}

function draw() {
  background(225);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (back.x < 100) {
    back.x = back.width / 2;
  }
  
  
  
  if (keyDown("space")) {
    player.velocityY = -12;
  }
  if (keyDown("LEFT_ARROW")) {
    player.x = player.x - 2;
  }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 2;
  }

  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
if (keyDown("space")) {
    player.velocityY = -12;
  }
  if (keyDown("LEFT_ARROW")) {
    player.x = player.x - 2;
  }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 2;
  }
    if(BulletGroup.isTouching(EnemyGroup)){
  score = score + Math.round(getFrameRate()/60);
    }
    }
  
  
  if (keyDown("UP_ARROW")) {
    bullet.visible = true;
    bullet.velocityX = -1;
    spawnBulletGroup();
  }

 
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 20, 20);
  spawnBulletGroup();
  spawnEnemyGroup();


}
function spawnBulletGroup() {
  if (frameCount % 12 === 0) {
    bullet = createSprite(180, 240, 800, 10);

    bullet.addImage(bullet_Img);
    bullet.velocityX = -1;
    //assign scale and lifetime to the obstacle
    bullet.scale = 0.1;
    bullet.lifetime = 300;

    bullet.visible = false;



    //add each obstacle to the group
    BulletGroup.add(bullet);
  }
}

function spawnEnemyGroup() {
  if (frameCount % 120 === 0) {
    var enemy = createSprite(250, 250, 800, 10);
    enemy.velocityX = -1;
    enemy.addAnimation("enemmy", enemy_Img);

    //assign scale and lifetime to the obstacle
    enemy.scale = 0.5;
    enemy.lifetime = 300;

    //add each obstacle to the group
    EnemyGroup.add(enemy);
  }
}

