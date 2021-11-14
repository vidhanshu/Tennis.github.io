//after reset random position will be given to the ball
const random = (min = 10, max = 20) => {
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
};



//initializations
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');
var canvasW = canvas.width;
var canvasH = canvas.height;
var fps = 60;
var ballX = random(canvasW / 2, canvasW - 100);
var ballSpeedX = 3;
var ballY = random(canvasH / 2, canvasH - 100);
var ballSpeedY = 3;
var paddle1Y = 5;
var PADDLE_HEIGHT = 100;
var up = document.getElementById("up");
var down = document.getElementById("down");
var bounce = new Audio("bouncy_ball.mp3");
var tap = new Audio("tap.wav");
var swap = new Audio("swap.wav");
var gameover = new Audio("gameOver.wav");
var score = 0;
var scoreSection = document.querySelector(".score");
const start = document.querySelector(".start");
var value;
var controls = document.querySelector(".controls");
var instruction = document.querySelector(".instructions");
var instruction_mobile = document.querySelector(".mobile")
const background = new Audio("BG.mp3");
var instruction_pc = document.querySelector(".pc")
var okay = document.querySelector("#Okay");
var next = document.querySelector(".next");
var lives = 3;
var live_section = document.querySelector(".lives");
var steps = 38;
const hc = document.querySelector(".high-score");
var High_score = 0;
const new_high_score = document.querySelector(".new-high-score");
const Make = document.querySelector(".Make");
const write_high_score = document.querySelector(".write-high-score");
var is_high_score_increased = false;
var body = document.querySelector(".body");
const dark = document.querySelector("#dark");
const volume = document.querySelector("#volume");


//toggle bg music

volume.addEventListener('click', function() {
    if (volume.className == "fas fa-volume-mute") {
        background.play();
        volume.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        background.pause();
        volume.classList.replace("fa-volume-up", "fa-volume-mute");

    }
})






//darkmod ki taiyariya
dark.addEventListener('click', function() {
    swap.play();
    if (dark.className == "fas fa-moon") {
        white_mod();
        dark.classList.replace("fa-moon", "fa-sun");
    } else {
        dark_mod();
        dark.classList.replace("fa-sun", "fa-moon");
    }
});

function dark_mod() {
    body.style.background = "rgb(75, 75, 75) ";
    body.style.color = "white";
    controls.style.background = "white";
    up.style.background = "black";
    down.style.background = "black";
    canvas.style.borderColor = "white";
}

function white_mod() {
    up.style.background = "white";
    down.style.background = "white";
    body.style.background = "white";
    body.style.color = "black";
    controls.style.background = "black";
}






//pata nhi pr jb mai heart ko remove krhu to jb phli bar krhu remove to meko do bar removeChild krna padh raha hai pr jb mai firse usme add krta hu jb hearts to ekhi bar me kam horha hai isilie maine flag kp initially false rkha hai badme jaise hi ek bar complete game over hojaega mai vaisehi flag ko true krduga taki agese removechild sirf ekhi bar chale 
var flag = false;


//tin heart create kie jaisehi complete game over hoga vaise hi mai in tino heart ko ghusedduga lives_section me
var span1 = document.createElement('i');
span1.setAttribute("class", "fas");
span1.classList.add("fa-heart");
var span2 = document.createElement('i');
span2.setAttribute("class", "fas");
span2.classList.add("fa-heart");
var span3 = document.createElement('i');
span3.setAttribute("class", "fas");
span3.classList.add("fa-heart");



okay.addEventListener('click', function() {
    instruction.style.display = "none";
    instruction_mobile.style.display = "none";
    background.play();
})
Make.addEventListener('click', function() {
    instruction.style.display = "none";
    new_high_score.style.display = "none";
})


//yeh starting me jo instruction atein hai na to unka button hai okay dabate hi gana chalu hojaega aur  baki pura instruction ka diaplay none
next.addEventListener('click', function() {
    instruction_pc.style.display = "none";
    instruction_mobile.style.display = "block";
})

//for controls to be displayed or not
window.onresize = function() {
    if (window.innerWidth >= 700) {
        controls.style.display = "none";
    } else {
        controls.style.display = "flex";
    }
}

start.addEventListener('click', startGame)



//intially
drawEverything(); //phli screen


//jaise hi start button dabaege yeh function call hoga
function startGame() {
    clearInterval(value);
    value = setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000 / fps);
    start.style.display = "none";
    if (volume.className != "fas fa-volume-mute") {
        background.play();
    }
}

//jaisehi ball left wall ko chuega yeh function call hoga mene else section me call kiya hai isko niche
function game_Over() {
    clearInterval(value);
    resetBall();
    drawEverything();
    background.pause();
    start.style.display = "block";
    lives--;
    if (flag == false) {
        live_section.removeChild(live_section.lastChild);
    }
    live_section.removeChild(live_section.lastChild);
    if (lives == 0) {
        //change
        volume.classList.replace("fa-volume-up", "fa-volume-mute");
        live_section.appendChild(span1);
        live_section.appendChild(span2);
        live_section.appendChild(span3);
        flag = true;
        lives = 3;
        if (High_score > score || is_high_score_increased == true) {
            instruction.style.display = "flex";
            write_high_score.innerHTML = High_score;
            new_high_score.style.display = "block";
        }
        score = 0;
        scoreSection.innerHTML = (score < 10) ? "0" + score : score;
    }
}

//for mobile on screen keys will work
up.addEventListener('click', function() {
    if (paddle1Y >= 10) {
        if (volume.className != "fas fa-volume-mute") {
            tap.play();
        }
        paddle1Y -= steps;
    }
});
down.addEventListener('click', function() {
    if (paddle1Y <= canvasH - PADDLE_HEIGHT - 5) {
        if (volume.className != "fas fa-volume-mute") {
            tap.play();
        }
        paddle1Y += steps;
    }
});




//for pc arrow keys will work
window.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == "38") {
        if (paddle1Y >= 10) {
            paddle1Y -= steps;
            if (volume.className != "fas fa-volume-mute") {
                tap.play();
            }
        }
    } else if (e.keyCode == '40') {
        if (paddle1Y <= canvasH - PADDLE_HEIGHT - 5) {
            if (volume.className != "fas fa-volume-mute") {
                tap.play();
            }
            paddle1Y += steps;
        }
    }
}




//game logic section 
function resetBall() {
    if (volume.className != "fas fa-volume-mute") {
        gameover.play();
    }
    ballX = random(canvasW / 2, canvasW - 100);
    if (random(0, 2) == 1) {
        ballSpeedX = ballSpeedX;
    } else {
        ballSpeedX = -ballSpeedX;
    }
    ballY = random(canvasH / 2, canvasH - 100);
}



function checkScore() {

    if (ballX <= 16) {
        if (ballY >= paddle1Y - 5 && ballY <= paddle1Y + PADDLE_HEIGHT + 5) {
            if (volume.className != "fas fa-volume-mute") {
                bounce.play();
            }

            score++;

            //to increase the high score
            if (High_score < score) {
                High_score = score;
                is_high_score_increased = true;
            }

            hc.innerHTML = (High_score < 10) ? "0" + High_score : High_score;

            //to increase the score
            scoreSection.innerHTML = (score < 10) ? "0" + score : score;

            //speed -direction reversing


            ballSpeedX = -ballSpeedX;
            if (score % 8 == 0) {
                ballSpeedY += 1;
                ballSpeedX += 1;
                PADDLE_HEIGHT -= 2;
                steps += 5;
            }
        } else {
            game_Over();
        }
    }
}

function moveEverything() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX >= canvasW - 10) {
        ballSpeedX = -ballSpeedX;
        if (volume.className != "fas fa-volume-mute") {
            bounce.play();
        }

    }
    checkScore();
    if (ballY >= canvasH - 10) {
        ballSpeedY = -ballSpeedY;
        if (volume.className != "fas fa-volume-mute") {
            bounce.play();
        }
    }
    if (ballY <= 4) {
        if (volume.className != "fas fa-volume-mute") {
            bounce.play();
        }

        ballSpeedY = -ballSpeedY;
    }
}

//frames drawing section
function drawEverything() {
    templateDraw(0, 0, canvasW, canvasH, "black");
    templateDraw(5, paddle1Y, 10, PADDLE_HEIGHT, "red");
    drawCircle(ballX, ballY, 10, "red");
}

function templateDraw(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(leftX, leftY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(leftX, leftY, radius, 0, 2 * Math.PI, true);
    canvasContext.fill();
}