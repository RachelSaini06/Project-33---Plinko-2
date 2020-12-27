const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var engine, world;
var ground;

var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;

var particle;

var score = 0;
var turn = 0;

var gameState = "start";


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  ground = new Ground(400, 800, 800, 20);

  //making the divisions
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //making the plinkos
  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for (var i = 50; i <=width-10; i = i + 50){
    plinkos.push(new Plinko(i, 175));
  }

  for (var h = 75; h <=width; h = h + 50) {
    plinkos.push(new Plinko(h,275));
  }

  for (var g = 50; g <=width - 10; g = g + 50){
    plinkos.push(new Plinko(g, 375));
  }

}
 


function draw() {
  background("black");
  textSize(20)
  fill("white")
  //displaying the amount of points you get where the particle falls
  text("Score : "+score, 10, 30);
  text("500", 23, 520);
  text("400", 103, 520);
  text("300", 183, 520);
  text("200", 263, 520);
  text("100", 343, 520);
  text("100", 423, 520);
  text("200", 503, 520);
  text("300", 583, 520);
  text("400", 663, 520);
  text("500", 743, 520);
  Engine.update(engine);
 
  ground.display();

  //when the gameState is in "end", GAME OVER will be displayed on  screen
  if (gameState === "end"){
    textSize(80);
    fill("red");
    text("Game Over", 200, 350);
  }



  for (var j = 0; j < plinkos.length; j++) {
    plinkos[j].display();
  }


  /*if(frameCount%60 === 0){
    particles.push(new Particle(random(width/2-30, width/2+30), 10, 10));
    score++;
  }*/
 
  /*for (var f = 0; f < particles.length; f++) {
    particles[f].display();
  }*/


  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }


  //this calculates how many points you will get depending where the particle falls
  if (particle != null){
    particle.display();

    if (particle.body.position.y > 770){
      if (particle.body.position.x < 63){
        score = score + 500;
        particle = null;
        if (turn >= 5) gameState = "end";
      }


      else if (particle.body.position.x > 65 && particle.body.position.x < 143){
        score = score + 400;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 145 && particle.body.position.x < 223){
        score = score + 300;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 225 && particle.body.position.x < 303){
        score = score + 200;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 305 && particle.body.position.x < 383){
        score = score + 100;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 385 && particle.body.position.x < 463){
        score = score + 100;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 465 && particle.body.position.x < 543){
        score = score + 200;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 545 && particle.body.position.x < 623){
        score = score + 300;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 625 && particle.body.position.x < 703){
        score = score + 400;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 705 && particle.body.position.x < 783){
        score = score + 500;
        particle = null;
        if (turn >= 5) gameState = "end";
      }

    }
  }


  drawSprites();
}

//the particle will fall when you click anywhere but it depends on your mouseX
function mouseReleased(){
  if (gameState !== "end"){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}