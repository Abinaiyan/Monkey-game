var gameState = "play";
var monkey, monkey_running
var banana, bananaImage, obstacleImage
var fruitGroup, obstacleGroup
var score
var invisibleGround
var score
var health


function preload() {


  monkey_running = loadAnimation( "sprite_0.png","sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(50, 252, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15

  ground = createSprite(300, 300, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  invisibleGround = createSprite(300, 305, 1200, 10);
  invisibleGround.visible = false;

  fruitGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  survival_Time = 0;

}


function draw() {
  background("white");
  
  stroke("black");
  fill("white");
  rect(460,10,139,100)
  text("Survival Time: " + survival_Time, 490, 50);
  text("Score: " + score, 490, 80);


  if (gameState === "play") {

    if (keyDown("space") && monkey.y >= 253) {
      monkey.velocityY = -12;
    }

    survival_Time = survival_Time + Math.round(frameCount / 180)


    spawnObstacles();
    spawnBanana();


    if (obstacleGroup.isTouching(monkey)) {

      gameState = "end";
    }


    if (fruitGroup.isTouching(monkey)) {
      score = score + 2;

      fruitGroup.destroyEach();

    }

  }

  if (gameState === "end") {


    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);

  stroke("black");
  fill("red");
   textSize(30);
   text("GameOver",270,150);

  }
  ground.velocityX = -4;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.velocityY = monkey.velocityY + 0.6

  monkey.collide(invisibleGround);

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 270, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15
    obstacle.velocityX = -5;
    obstacle.lifetime = 180;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, Math.round(random(120, 200)), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.10
    banana.velocityX = -5;
    banana.lifetime = 180;
    fruitGroup.add(banana);
  }
}