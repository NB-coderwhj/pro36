var foodS, foodStock;
var dog, myDog;
var database;
var feedButton, addFoodButton;
var milk, input, inputButton;
var dogName, lastFedRef

function preload(){
  dogImg = loadImage("images/dogImg.png");
  myDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  getTime();
  milk = new Milk();

  dog = createSprite(350,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.15
  
  database=firebase.database();
 
  milk.getFS();
  getLFT();

  input = createInput("Your Dog");
  input.position(dog.x + 280, dog.y + 110);

  inputButton = createButton('Submit');
  inputButton.position(750,500);
  inputButton.mousePressed(()=>{
    input.hide();
    inputButton.hide();
    dogName = input.value();

  })

  feedButton = createButton('Feed');
  feedButton.position(575,75);
  feedButton.mousePressed(()=>{
    milk.deductFS();
    milk.updateFS(milk.milkStock);
    updateLFT(hour);
    dog.addImage(myDog);
  });

  addFoodButton = createButton('Add Milk');
  addFoodButton.position(770,75);
  addFoodButton.mousePressed(()=>{
    if(milk.milkStock<30){
    milk.milkStock += 1;
    }
    milk.updateFS(milk.milkStock);
    dog.addImage(dogImg);
  })
}

function draw() {  
  background(46,139,87);

  milk.display();
  drawSprites();
  getTime(); 

  fill(255);
  textSize(20);
  text("FoodStock = "+milk.milkStock,20,450);
  text(""+dogName,dog.x,dog.y+70/*200+110,200+220*/);
  text("last fed = "+lastFedRef,20,20);

   console.log(lastFedRef);
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  console.log(hour);
}

function updateLFT(hr){
  database.ref('/').update({
    lastFed:hr
})
}

function getLFT(){
  /*database.ref('lastFed').on("value",(data)=>{
    lastFedRef = data.val();
  })*/
  database.ref('lastFed').on("value",(data)=>{
    lastFedRef = data.val();
});
}



