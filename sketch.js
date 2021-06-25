var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkey_running;
var ground;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup;
var survivalTime;

function preload(){
  monkey_running =                                            loadAnimation("sprite_0.png","sprite_1.png",             "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");            
  
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600, 450);
    monkey = createSprite(80,315,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.scale = 0.1;
  
    ground=createSprite(400,400,1000,200);
    ground.shapecolour="brown";
    ground.velocityX=-4;
    ground.x=ground.width/2;
    console.log(ground.x);
  
    //create Groups
    survivalTime=0;
    bananaGroup = createGroup();
    obstacleGroup=createGroup();
    
}
function draw() {
  background("lightgreen");
  
    if(gameState === PLAY){

    //spawn the banana
    spawnBanana();
    //spawn the obstacle
    spawnObstacle();
      
    if (ground.x < 100){
        ground.x = ground.width/2;
      }

    if(keyDown("space")){
      monkey.velocityY=-12;
    }

    monkey.velocityY=monkey.velocityY+0.8;  
    monkey.collide(ground);
  
    //displaying score
    stroke("white");
    textSize(20);
    fill("white");
  
    stroke("black");
    textSize(20);
    fill("black");
    
    text("Survival Time - "+ survivalTime, 230,30);
      
      if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
        survivalTime=survivalTime+10;
      }
      
    if(obstacleGroup.isTouching(monkey)){
    gameState=END;
      }
  }
  if(gameState === END){
    textSize(60);
    text("GAME OVER",150,200);
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.visible=false;
    monkey.visible=false;
  }
  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
  
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}
function spawnObstacle() {
  //write code here to spawn the obstacle
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,262,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}