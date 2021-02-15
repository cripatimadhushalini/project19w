var ground,groundImg,iG,iG2;
var player,playerImg;
var fruit1,fruit2,fruit3,fruitsGroup;
var distance = 0;
var ghost,ghostImg,ghostGroup;
var score = 0;
var sprites,spritesImg,spritesGroup;
var restart,rImg;

var PLAY = 1;
var END = 0;
gameState = PLAY;

function preload(){
  groundImg = loadImage("ground5.webp");
  playerImg = loadImage("palyer.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  spritesImg = loadImage("wood Image.webp");
  rImg = loadImage("restart Icon.png");
}

function setup() {
 createCanvas(600,600);
  ground = createSprite(width/2,200);
  ground.addImage(groundImg);
  
  iG = createSprite(350,400,700,10);
  iG.visible = false;
  
  iG2 = createSprite(5,200,10,500);
  iG2.visible = false;
  
  player = createSprite(width/8,height-250,20,20);
  player.addImage(playerImg);
  player.scale = 0.2;
  //player.debug = true;
  player.setCollider("rectangle",0,0,400,player.height);
  
    
  restart = createSprite(320,200,10,10);
  restart.visible = false;
  restart.addImage("Img",rImg);
  restart.scale = 0.05;
 
  fruitsGroup = new Group();
  ghostGroup = new Group();
  spritesGroup = new Group();
  
}

function draw() {
  
  if(gameState===PLAY){
    
  ground.velocityX = -4;
    
  createGhosts();
  createSprites();
  
  distance = distance + Math.round(getFrameRate()/60);
  
  player.velocityY = player.velocityY+0.8;
  
  if(player.isTouching(fruitsGroup)){
    score = score+20;
  }
  
  if(player.isTouching(ghostGroup)){
    gameState = END;
  }
  
  if(ground.x<290){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && player.y >=100){
    player.velocityY = -10;
  }
  }else if(gameState===END){
    fruit.velocityX = 0;
    ghost.velocityX = 0;
    text("GAME OVER",300,300);
    ground.velocityX = 0;
    restart.visible = true;
    //text("restart",300,300);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  

  player.collide(iG);
  player.collide(iG2);
  //player.collide(spritesGroup);
  drawSprites();
  
  fill("black");
  stroke("yellow")
  textSize(18)
  text("distance : "+distance,500,30);
  
  text("Score : "+score,500,60);
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -4;
  spritesGroup.destroyEach();
  fruitsGroup.destroyEach();
  ghostGroup.destroyEach();
  restart.visible = false;
}

function createSprites(){
  if(frameCount%60===0){
     sprites = createSprite(200,200,20,20);
    fruit = createSprite(200,200,20,20);
    
    sprites.addImage(spritesImg);
    
  var rand = Math.round(random(1,3));
  switch(rand){
    case 1 : fruit.addImage(fruit1);
    break;
    case 2 : fruit.addImage(fruit2);
    break;
    case 3 : fruit.addImage(fruit3);
    break;
  
    default : break;
  }
    
    sprites.x = fruit.x;
    sprites.y = fruit.y;
    
    fruit.velocityX = -4;
    sprites.velocityX = -4;
    
    //fruit.debug = true;
    sprites.debug = true;
    
    fruit.scale = 0.2;
    sprites.scale = 0.2;
    
    fruitsGroup.add(fruit);
    spritesGroup.add(sprites);
  }
}

function createGhosts(){
  if(frameCount%200===0){
    ghost = createSprite(600,200,10,10);
    ghost.velocityX = -4;
    ghost.y = Math.round(random(10,300));
    ghostGroup.add(ghost);
  }
}
