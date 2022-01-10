//A senhora não tem noção o trabalho que deu até eu ter a ideia de calcular o y da imagem até chegar no final... KKKKKKKKKKKK Tive que usar o frameCount, a imagem era muito grande kkkkkkkkkkkkk
//Acho que a adaptação ficou legal, mas vou diminuir o tamanho natural do jogo, a animação da faca ficou muito fluida com a resolução mais baixa
//  https://guilhermew3ber.github.io/FakeFruitNinjaMobileTry/
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, gameOverAn;
var gameOverSound ,knifeGroup;
var fundo, fundoImg
var frag;
var boom;

function preload(){
  fundoImg=loadImage("fundoInf.png");
  knifeImage = loadImage("Blade.png");
  monsterImage = loadAnimation("bomba1.png","bomba2.png")
  fruit1 = loadImage("laranja.png");
  fruit2 = loadImage("pera.png");
  fruit3 = loadImage("maca.png");
  fruit4 = loadImage("banana.png");
  gameOverAn = loadAnimation("X.png", "Blank.png")
  gameOverImage=loadImage("X.png");
  fragImg= loadImage("fragment.png")
  //gameOverSound = loadSound("gameover.mp3")
  //knifeSwooshSound = loadSound("knifeSwoosh.mp3")

  knifeGroup= new Group;
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  fundo=createSprite(windowWidth/2,windowHeight/2,20,20);
  fundo.addImage(fundoImg);
  fundo.scale=windowWidth/500
  fundo.velocityY=-10;
  fundo.setCollider("rectangle",0,0,40,40);
  score=0;

  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  if(World.frameCount %10===0){
    console.log(fundo.y);
  }
  if(fundo.y<-10000){
    fundo.y=681.5;

  }  
  if(gameState===PLAY){
    
    fruits();
    bomb();
    

  
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      frag =createSprite(fruit.x, fruit.y,10,10);
      frag.addImage(fragImg);
      frag.scale=0.1;
      frag.velocityY=10+(score/4)
      score=score+2;
    }
    else
    {
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.destroy();
        knife.x=300;
        knife.y=300;

        boom=createSprite(windowWidth/2,windowHeight/2,20,20);
        boom.addAnimation("ending", gameOverAn);
        boom.scale=0.3
      }

    }

  }
  
  
  drawSprites();
  fill("white");
  textSize(25);
  text("Score: "+ score, windowWidth/2, 40);
  

}


function bomb(){
  if(World.frameCount%200===0){
    monster=createSprite(random(windowWidth),windowHeight,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.velocityY=-(8+(score/10));
    monster.setLifetime=50;
    monster.scale=0.15
    monster.rotationSpeed=10
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(random(windowWidth),windowHeight,20,20);
    fruit.scale=0.2;

    if(fruit.y=-200){
      fruit.velocityY=(10+(score/4));
    }else{
      fruit.velocityY= -(16+(score/4));
    }

    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1) {
    fruit.addImage(fruit1);
    fruit.scale=0.12;
    fruit.rotationSpeed=10;
    } else if (r == 2) {
    fruit.addImage(fruit2);
    fruit.rotationSpeed=-10;
    } else if (r == 3) {
    fruit.addImage(fruit3);
    fruit.rotationSpeed=6;
    } else {
    fruit.addImage(fruit4);
    fruit.rotationSpeed=-8;
    }
           
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
      
  }
}

function mouseDragged(){
  knife=createSprite(40,200,20,20);
  knife.x=World.mouseX;
  knife.y=World.mouseY;
  knife.addImage(knifeImage);
  knife.scale=0.4;
  knife.setCollider("rectangle",0,0,40,40);
  knife.lifetime=2
  knifeGroup.add(knife)
}
function mouseReleased(){
  knifeGroup.destroyEach();

  
}

