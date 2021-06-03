var canvas, backgroundImage;
var startButton,startImg

var gameState = 0;
var playerCar,AIcar;
var playerCarIMG,AIcarIMG;

var track;
var barricade,barricadeIMG
var timer=150;
var countdownS
var oneIMG, twoIMG,threeIMG

var obstaclesGroup;

function preload(){ 
  backgroundImage=loadImage("IMAGES/WELCOME.png")
  startImg=loadImage("IMAGES/START.png")
  playerCarIMG=loadImage("IMAGES/car3.png")
  AIcarIMG=loadImage("IMAGES/car4.png")
  track=loadImage("IMAGES/track.jpg")
  barricadeIMG=loadImage("IMAGES/barricade.png")
  oneIMG=loadImage("IMAGES/one.png")
  twoIMG=loadImage("IMAGES/number-2.png")
  threeIMG=loadImage("IMAGES/number-3.png")


}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  startButton=createSprite(width/2,height/2,50,20)
  startButton.addImage(startImg)
  startButton.scale=0.1

  playerCar=createSprite(width/2+200,height-250)
  playerCar.addImage(playerCarIMG);
  playerCar.visible=false
  playerCar.scale=2

  AIcar=createSprite(width/2-200,height-250)
  AIcar.addImage(AIcarIMG);
  AIcar.visible=false
  AIcar.scale=2

  countdownS=createSprite(width/2,height/2,50,20)
  countdownS.addImage("3",threeIMG)
  countdownS.addImage("2",twoIMG)
  countdownS.addImage("1",oneIMG)
  countdownS.visible=false
  countdownS.scale=0.25

  obstaclesGroup=new Group();;
}


function draw(){
    if(gameState===0){
      background(backgroundImage)
      textSize(50)
      fill("black")
      textStyle(BOLD)
      text("DRIVE TO SURVIVE",450,200);
      if(mousePressedOver(startButton)){
        gameState=1;
        startButton.visible=false
      }
      drawSprites();
    }
    if(gameState===1){
      background(255);
      image(track,0,-displayHeight*20,displayWidth,displayHeight*21)
      AIcar.visible=true;
      playerCar.visible=true;
      countdownS.visible=true
      countdown();


      if(timer===0){
        countdownS.visible=false
        control();
        AI();
        obstacles();
        camera.position.y=playerCar.y;
      }
      drawSprites()
      if(playerCar.y<-14660){
        gameState=2;
      }
      if(obstaclesGroup.isTouching(playerCar)){
      
        gameState = "END";
  
      }
    }
      if(gameState===2){
        textSize(40)
        fill("black")
        strokeWeight(4)
        stroke("red")
        if(playerCar.y<AIcar.y){
        text("YOU HAVE WON",width/2-150,camera.position.y)
        }
        else{
          text("COMPUTER HAS WON",width/2-150,camera.position.y)
        }
        gameState=undefined;
      }

   if(gameState==="END"){
     clear();
     textSize(40)
     fill("black")
     strokeWeight(4)
     stroke("red")
     text("YOU HAVE LOST",width/2-150,camera.position.y)
   }
}
function control(){
  if(keyDown("left")){
    playerCar.x -=10;
  }
  if(keyDown("right")){
    playerCar.x +=10;
  }
  if(keyDown("up")&& touches.length>0){
    playerCar.y -=20;
    touches=[]
  }
}

function AI(){
  AIcar.y -=random(15,20)
}

function obstacles(){
  if(frameCount%50===0){
  var obstacle;
  obstacle=createSprite(random(200,width-200),camera.position.y-500)
  obstacle.addImage(barricadeIMG);
  obstacle.scale=0.25;
  obstacle.lifetime=100;
  obstaclesGroup.add(obstacle);
  }

}
function countdown(){
  if(timer>0){
    timer -=1
  }
 
  if(timer<100 && timer>50){
    countdownS.changeImage("2",twoIMG)
  }
  if(timer<50 && timer>0){
    countdownS.changeImage("1",oneIMG)
  }

}