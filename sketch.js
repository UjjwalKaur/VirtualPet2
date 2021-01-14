var dog, happyDog, dogImage, happyDogImage;
var database;
var foodS, foodStock,foodObj;
var fedTime,lastFed;
var feedButton, addFoodButton;

function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,40,50);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  //foodObj = new Food();

  feedButton = createButton('Feed the Dog');
  feedButton.position(650,50);
  feedButton.mousePressed(feed);

  addFoodButton = createButton('Add Food');
  addFoodButton.position(750,50);
  addFoodButton.mousePressed(addFood);
  
}


function draw() {  
  background(46,139,87)

  foodObj.display();

  feedTime = database.ref('FedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255.254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM",350,30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  } else {
    text("Last Fed : "+ lastFed + "AM",350,30);
  }
  
  textSize(20);
  fill("turquoise");
  stroke(0);
  text("Food remaining "+foodS, 250,50);

  textSize(10);
  fill(0);
  stroke(0);
  text("Press UP_ARROW to feed milk", 50,50);

  drawSprites();

}

function feed(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}