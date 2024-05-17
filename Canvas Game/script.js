let startButton = document.querySelector(".start-button");
let resetButton = document.querySelector(".reset-button");
let startButtonText = document.querySelector("#start-button-text");
let gameStarted = false; // pretty obvious i think
let leftUpPressed = false;
let leftDownPressed = false;
let rightUpPressed = false;
let rightDownPressed = false;
var mySquare;// Declare mySquare outside of functions
var leftPaddle;// Declare leftPaddle outside of functions
var rightPaddle;// Declare rightPaddle outside of functions
var gameOverScreen = document.querySelector(".game-over-screen");

startButton.onclick=function(){
    console.log("Game start clicked");
    startButton.style.display="none";
    resetButton.style.display="block";
    if(gameStarted != true){
      startGame();
    }
    else if(gameStarted === false){
      location.reload();
    }
};

function startGame() {//width, height, color, x, y, speed
    
    //if(gameStarted !== true){ 
      myGameArea.start();
      console.log("game started");
      mySquare = new gameComponent(20,20,"blue",11,120,2);
      leftPaddle = new gameComponent(10,40,"green",0,myGameArea.canvas.height/2,0);
      rightPaddle = new gameComponent(10,40,"red",myGameArea.canvas.width-10,myGameArea.canvas.height/2,0);
      /*mySquare = new component(20,20,"blue",11,120,2);
      leftPaddle = new component(10,40,"green",0,myGameArea.canvas.height/2,0);
      rightPaddle = new component(10,40,"red",myGameArea.canvas.width-10,myGameArea.canvas.height/2,0);*/
      
      
    //}
    gameStarted = true;
  }
  
  //game canvas class constructs game area
  var myGameArea = {
    canvas : document.createElement("canvas"),
    parentElement : document.querySelector(".game-container"),
    start: function() {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.border = "solid 2px yellow";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        // append the canvas to the screen
        this.parentElement.appendChild(this.canvas);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
};


class gameComponent {
  constructor(width, height, color, x, y, speed) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed=speed;
  }
  
  update(){ // update method takes properties of square object component
     var ctx = myGameArea.context;
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
 }
  checkCollideWith(gameObject,puck){
    let bottomPaddleCollide = false;
    let topPaddleCollide = false;
    let rightWallCollide = false;
    let leftWallCollide = false;
    if(((gameObject.x + puck.width > myGameArea.canvas.width-10) || (gameObject.x < 10)) && ((puck.y <= gameObject.y) && (puck.y >= gameObject.y+40))){ //check collide with paddle
        //sprite.x = sprite.x-1;
        topPaddleCollide = true;
        sprite.speed = -sprite.speed;
    }
    else if((((gameObject.x + puck.width > myGameArea.canvas.width-10) || (gameObject.x < 10)))){ // check collide with wall
      rightWallCollide = true;
      gameOverScreen.style.display="block";
      return "Game Over!";
    }
}
}




    //when called clears screen and redraws objects during "update" method
  function updateGameArea() {
    console.log("game area updated");
    myGameArea.clear();
    mySquare.x += mySquare.speed;
    //console.log(mySquare.x);
    //console.log(myGameArea.canvas.width);
    checkCollideWith(rightPaddle,mySquare);
    checkCollideWith(leftPaddle,mySquare);
    //checkCollideWith(myGameArea,mySquare);
    document.querySelector(".tracker-x").innerHTML = mySquare.x;
    document.querySelector(".tracker-y").innerHTML = mySquare.y;
    document.querySelector(".tracker-speed").innerHTML = mySquare.speed;
    document.querySelector(".tracker-paddle-y").innerHTML = leftPaddle.y;
    if (leftUpPressed) {
        leftPaddle.y = Math.max(leftPaddle.y - 7, 0);
      } else if (leftDownPressed) {
        leftPaddle.y = Math.min(leftPaddle.y + 7, myGameArea.canvas.height - 40);
      }
    if (rightUpPressed) {
        rightPaddle.y = Math.max(rightPaddle.y - 7, 0);
      } else if (rightDownPressed) {
        rightPaddle.y = Math.min(rightPaddle.y + 7, myGameArea.canvas.height - 40);
      }
    mySquare.update();
    leftPaddle.update();
    rightPaddle.update();
  }

  function keyDownHandler(e) {
    if (e.key === "w" || e.key === "W") {
      leftUpPressed = true;
    } else if (e.key === "s" || e.key === "S") {
      leftDownPressed = true;
    }
    if (e.key === "Up" || e.key === "ArrowUp") {
      rightUpPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      rightDownPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "w" || e.key === "W") {
      leftUpPressed = false;
    } else if (e.key === "s" || e.key === "S") {
      leftDownPressed = false;
    }
    if (e.key === "Up" || e.key === "ArrowUp") {
      rightUpPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      rightDownPressed = false;
    }
  }

  function movePaddles(){ //moves the paddles up and down
    if (leftUpPressed) {
        leftPaddle.y += 7;
      } else if (leftDownPressed) {
        leftPaddle.y -= 7;
      }
    if (rightUpPressed) {
        rightPaddle.y += 7;
      } else if (rightDownPressed) {
        rightPaddle.y -= 7;
      }

  }



