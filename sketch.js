//Create variables here
var dog,happyDog,database, foodS, foodStock;
var dogSprite,ground;
var fedTime,lastFed,feed,addFood,foodObj;


function preload()
{
  //load images here
  dog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png")
}

function setup() {
  database=firebase.database();
  createCanvas(900,380);
   foodObj=new Food()
   foodStock=database.ref('Food');
   foodStock.on("value",readStock);
   
   
  dogSprite=createSprite(750,200,150,150);
  dogSprite.addImage(dog);
  dogSprite.scale=0.2;


 feed=createButton("FEED THE DOG")
 feed.position(425,95)
 feed.mousePressed(feedDog)
 addFood=createButton("ADD FOOD")
addFood.position(550,95)
addFood.mousePressed(addFoods);

  
}


function draw() {  
  background("lightgreen")
  
  foodObj.display();

  drawSprites();
 //add styles here
 

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("LAST FEED: "+lastFed%12+ " PM",550,65)
}
else if(lastFed==0){
  text("LAST FEED: 12 PM", 550,65);
}
else{
  text("LAST FEED: "+lastFed+ " AM",550,65)
}
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
   database.ref('/').update({
     Food:foodObj.getFoodStock(), 
     FeedTime:hour() 
    }) 
  } 



  function addFoods(){ 
    foodS++; 
    database.ref('/').update({
       Food:foodS
       }) 
  }

