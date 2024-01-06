let gameContainer = document.querySelector(".game-container");

let Xcoordinate,Ycoordinate;
let headX = 12, headY=15;
let velocityX= 0,velocityY = 0;
let snakeBody = [];
let scoreBoard = document.querySelector(".score-container");
let score = 0;
let speedOfSnake = 200;

function generateFood(){
    Xcoordinate = Math.floor(Math.random() * 25)+1;
    Ycoordinate = Math.floor(Math.random() * 25)+1;
}

function gameOver(){
    headX=12;
    headY=12;
    velocityX=0;
    velocityY=0;
    generateFood();
    alert("game Over");
    snakeBody=[];
    score=0;
    scoreBoard.innerText = "Press any (left right up down) Key to start"
}

function renderGame(){

    let updatedGame = `<div class='food' style='grid-area: ${Ycoordinate}/${Xcoordinate}'></div>`

    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);

    if(headX>=26 || headY>=26 || headX==0 || headY==0){
       gameOver();
    }

    for(let i=0;i<snakeBody.length;i++){
        updatedGame+= `<div class='snake' style='grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}'></div>`
    }
   

    gameContainer.innerHTML=updatedGame;

    for(let i=1;i<snakeBody.length;i++){
        if(headX==snakeBody[i][0] && headY==snakeBody[i][1]){
            gameOver();
        }
    }
   
    if(headX==Xcoordinate && headY==Ycoordinate){
        score+=1;
        scoreBoard.innerText = `Score : ${score}`
        snakeBody.push([Xcoordinate,Ycoordinate]);
        
        generateFood();
    }
}

generateFood();

var myIntervalId = setInterval(renderGame,speedOfSnake);



document.addEventListener('keydown',function(e){
    let key=e.key;
    scoreBoard.innerText = `Score : ${score}`
    if(key=="ArrowUp" && velocityY!=1){
       velocityX=0;
       velocityY=-1;
    }
    else if(key=="ArrowDown" && velocityY!=-1){
       velocityX=0;
       velocityY=1;
    }
    else if(key=="ArrowRight" && velocityX!=-1){
        velocityX=1;
       velocityY=0;
    }
    else if(key=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
       velocityY=0;
    }
})

