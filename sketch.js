
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var scoreSound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  scoreSound=loadSound("button-09.mp3");
  
  FoodGroup=new Group()
  obstacleGroup=new Group()
 
}



function setup() {
  createCanvas(600,450)
  score=0;
  survivalTime=0;
  
  ground=createSprite(0,400,1500,10)
  
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.1

 
  monkey.debug=true;
  
}


function draw() {
background("green");
  
  if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-10
  }
  if(keyDown("UP")&&monkey.y >= 350){
    monkey.velocityY=-10
  }
  
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground)
  
  
  ground.velocityX = -7 
 ground.x = ground.width/2;
  
  if (gameState===PLAY){
    
    survivalTime=survivalTime+Math.round(getFrameRate()/1);
    
    if(World.frameCount%35 ===0){
    fruits()
 }
  
  if(World.frameCount%75===0){
    stones()
 }
  
    if(gameState===END){
       survivalTime=0;
       }
    
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1;
    scoreSound.play()
      }
  if(monkey.isTouching(obstacleGroup)){
    
    
    obstacleGroup.destroyEach()
    score=score-1;
    }
    
    
      }
  
  
  if(score<=-5){
    textSize(50);
    textFont("georgia");
    fill("PURPLE") 
    text("Game Over",200,200)
    gameState=END;
    obstacle.velocityX=10;
    banana.velocityX=10;
    obstacleGroup.visible=false;
    FoodGroup.visible=false;
    
     }  
  if(score>=10){
    textSize(50);
    textFont("georgia");
    fill("PURPLE") 
    text("You Win!!",200,200)
    gameState=END;
    obstacle.velocityX=10;
    banana.velocityX=10;
    obstacleGroup.visible=false;
    FoodGroup.visible=false;
    
     }  
  
  drawSprites()
  textSize(45);
    textFont("georgia");
  fill("white") 
  text("Score: "+ score, 400,50);
  
  textSize(40);
    
  fill("black")
 
  text("Survival Time: "+ survivalTime,10,50)
  
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(270,100)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-(7.5+(score/100))
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-(15+(score/100))
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
}






