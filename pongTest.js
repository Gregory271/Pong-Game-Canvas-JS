let startButton = document.querySelector(".start-button");
let resetButton = document.querySelector(".reset-button");
let startButtonText = document.querySelector("#start-button-text");
let gameContainer = document.querySelector(".game-container");
let gameStarted = false;
let leftUpPressed = false;
let leftDownPressed = false;
let rightUpPressed = false;
let rightDownPressed = false;

var puckImage = new Image();//new code for puck img
puckImage.src = "./media/puck.png";

var mySquare; // Declare mySquare outside of functions
var leftPaddle; // Declare leftPaddle outside of functions
var rightPaddle; // Declare rightPaddle outside of functions
var gameOverScreen = document.querySelector(".game-over-screen");

var gameOverAudio = document.getElementById("game-over-music");
gameOverAudio.volume=0.05;
gameOverAudio.pause();

startButton.onclick = function () {
    console.log("Game start clicked");
    startButton.style.display = "none";
    resetButton.style.display = "block";
    startGame();
};



function startGame() {
    myGameArea.start();
    console.log("game started");
    mySquare = new gameComponent(20, 20, "blue", 11, 120, 3, 2); // Initialize with both speedX and speedY
    leftPaddle = new gameComponent(10, 40, "green", 0, myGameArea.canvas.height / 2 - 20, 0, 0);
    rightPaddle = new gameComponent(10, 40, "red", myGameArea.canvas.width - 10, myGameArea.canvas.height / 2 - 20, 0, 0);
    gameStarted = true;
}

// Game canvas class constructs game area
var myGameArea = {
    canvas: document.createElement("canvas"),
    parentElement: document.querySelector(".game-container"),
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.border = "solid 2px yellow";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.parentElement.appendChild(this.canvas);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

class gameComponent {
    constructor(width, height, color, x, y, speedX, speedY = 0) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
       /* var ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(puckImage,this.x,this.y,this.width,this.height);*/
        var ctx = myGameArea.context;
        if (this.color === "blue") { // Draw puck image only for the puck object
            ctx.drawImage(puckImage, this.x, this.y, this.width, this.height);
        } else { // Draw other game components as filled rectangles
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function checkCollideWith(paddle, puck) {
    let paddleTopEdge = paddle.y;
    let paddleBottomEdge = paddle.y + paddle.height;
    let paddleLeftEdge = paddle.x;
    let paddleRightEdge = paddle.x + paddle.width;

    let puckTopEdge = puck.y;
    let puckBottomEdge = puck.y + puck.height;
    let puckLeftEdge = puck.x;
    let puckRightEdge = puck.x + puck.width;

    if (puckRightEdge >= paddleLeftEdge && puckLeftEdge <= paddleRightEdge &&
        puckBottomEdge >= paddleTopEdge && puckTopEdge <= paddleBottomEdge) {
        // Collision with paddle
        puck.speedX = -puck.speedX;
        console.log("puck hit the paddle");

        // Adjust vertical speed based on where the puck hits the paddle
        let hitPosition = (puck.y + puck.height / 2) - paddle.y;
        let hitRatio = hitPosition / paddle.height;
        let maxSpeedY = 3; // Adjust this value to control maximum vertical speed
        puck.speedY = (hitRatio - 0.5) * maxSpeedY * 2;
    }

    // Check for collision with top and bottom walls
    if (puckTopEdge <= 0) {
        puck.y = 0; // Ensure the puck is within bounds
        puck.speedY = Math.abs(puck.speedY); // Negate vertical speed
        console.log("puck hit the top wall");
    } else if (puckBottomEdge >= myGameArea.canvas.height) {
        puck.y = myGameArea.canvas.height - puck.height; // Ensure the puck is within bounds
        puck.speedY = -Math.abs(puck.speedY); // Negate vertical speed
        console.log("puck hit the bottom wall");
    }

    // Check for collision with left and right walls (Game Over condition)
    if (puckRightEdge >= myGameArea.canvas.width || puckLeftEdge <= 0) {
        console.log("puck hit the side wall");
        gameContainer.innerHTML="";
        gameContainer.style.display="none";
        gameOverScreen.style.display = "block";
        gameOverAudio.play();
        clearInterval(myGameArea.interval);
    }
}


// When called, clears screen and redraws objects during "update" method
function updateGameArea() {
    myGameArea.clear();
    mySquare.x += mySquare.speedX;
    mySquare.y += mySquare.speedY; // Update y position
    checkCollideWith(rightPaddle, mySquare);
    checkCollideWith(leftPaddle, mySquare);
    document.querySelector(".tracker-puck-x").innerHTML = mySquare.x;
    document.querySelector(".tracker-puck-y").innerHTML = mySquare.y;
    document.querySelector(".tracker-speed-x").innerHTML = mySquare.speedX;
    document.querySelector(".tracker-speed-y").innerHTML = mySquare.speedY; // Display vertical speed
    document.querySelector(".tracker-lpaddle-y").innerHTML = leftPaddle.y;
    document.querySelector(".tracker-rpaddle-y").innerHTML = rightPaddle.y;
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

function movePaddles() { // Moves the paddles up and down
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

