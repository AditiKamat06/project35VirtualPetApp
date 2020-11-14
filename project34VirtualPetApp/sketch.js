var dog,happydog,foodstock,foodS,database,dogI,happydogI,milk,milkI;

function preload(){
  dogI = loadImage('images/dogImg.png');
  happydogI = loadImage('images/dogImg1.png');
}

function setup(){
  createCanvas(1800, 1800);
  dog = createSprite(800,800,20,20);
  dog.addImage(dogI);
  drawSprites();

  database = firebase.database();
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw(){
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogI);
  }

  if (keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogI);
  }

  drawSprites();
  textSize(70);

  text("Press the up arrow key to make Drago hungry", 200,200);
  fill("black");
  stroke(4);

  text("Press the down arrow key to make Drago hungry", 200,300);
  fill(0,0,0);
  stroke(4);

  text("Food Remaining  " + foodS, 200,400);
  fill(0,0,0);
  stroke(4);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + "PM", 350, 30);
  }else if(lastFed===0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : " + lastFed + "AM" , 350, 30);
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock (x) {
  if (x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage();

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    food : foodS
  })
}