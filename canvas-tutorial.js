const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// draw rectangle
ctx.strokeStyle="red 2px solid";
ctx.fillstyle="white";
ctx.beginPath();
ctx.style.backgroundColor="red";
ctx.rect(canvas.width/2,canvas.height/2,10,10);
ctx.fill();


//let radius = 30;
//const transformButton = document.querySelector(".transform-button");
/*
//draw circle
ctx.strokeStyle = "lime";
ctx.beginPath();
ctx.arc(canvas.width/2,canvas.height/2,50,0,Math.PI*2);
ctx.stroke();*/
//draw "smile"
/*ctx.strokeStyle = "white";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(canvas.width/2,canvas.height/2,radius,0,Math.PI);
ctx.stroke();
ctx.beginPath();
ctx.arc(canvas.width/2,canvas.height/2,radius,0,Math.PI);
ctx.stroke();*/
//draw "eyes"
/*ctx.strokeStyle = "white";
ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(canvas.width/2-20,canvas.height/2-15,6,0,Math.PI*2);
ctx.arc(canvas.width/2+20,canvas.height/2-15,6,0,Math.PI*2);
ctx.fill();*/



transformButton.onclick=function(){
    for(let i=0;i<=canvas.width/2-25;i++){
        ctx.translate(2+i,0);
        ctx.fillStroke(0,0,50,50);
        ctx.restore();
    }
};
