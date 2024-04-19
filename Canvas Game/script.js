let startButton = document.querySelector("#start-button");
let mySquare; // Declare mySquare outside of functions
let leftPaddle; // Declare leftPaddle outside of functions
let upPressed = false;
let downPressed = false;

startButton.onclick=function(){
    //console.log("Game start clicked");
    startGame();
};

function startGame() {
    myGameArea.start();
    console.log("game started");
    mySquare = new component(20,20,"blue",11,120,2);
    leftPaddle = new component(10,40,"green",0,myGameArea.canvas.height/2,0);
  }
  
  //game canvas class constructs game area
  var myGameArea = {
    canvas : document.createElement("canvas"),
    parentElement : document.querySelector(".game-container"),
    start: function() {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.border = "solid 2px red";
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

//component for square "sprite"
function component(width, height, color, x, y, speed) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed=speed;
    this.update = function(){ // update method takes properties of square object component
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

  }
    //when called clears screen and redraws objects during "update" method
  function updateGameArea() {
    console.log("game area updated");
    myGameArea.clear();
    mySquare.x += mySquare.speed;
    //console.log(mySquare.x);
    //console.log(myGameArea.canvas.width);
    checkCollision(mySquare);
    document.querySelector(".tracker-x").innerHTML = mySquare.x;
    document.querySelector(".tracker-y").innerHTML = mySquare.y;
    document.querySelector(".tracker-speed").innerHTML = mySquare.speed;
    document.querySelector(".tracker-paddle-y").innerHTML = leftPaddle.y;
    if (upPressed) {
        leftPaddle.y = Math.max(leftPaddle.y - 7, 0);
      } else if (downPressed) {
        leftPaddle.y = Math.min(leftPaddle.y + 7, myGameArea.canvas.height - 10);
      }
    mySquare.update();
    leftPaddle.update();
  }

  function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
      upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      downPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
      upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      downPressed = false;
    }
  }

  function movePaddles(){
    if (upPressed) {
        leftPaddle.y += 7;
      } else if (downPressed) {
        leftPaddle.y -= 7;
      }
  }

  function checkCollision(sprite){
    if((sprite.x + sprite.width > myGameArea.canvas.width) || (sprite.x < 10)){
        //sprite.x = sprite.x-1;
        sprite.speed = -sprite.speed;
    }
  }

