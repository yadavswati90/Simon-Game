let gameSequence =[];
let userSequence = [];
let btns =["red","green","purple","yellow"];

let started= false;
let level = 0;
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
let highestScorevalue = 0;

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game Started!");
        started=true;
        levelUp();
    }
})

function gameFlash(btn){
    //console.log(btn);
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
}

function levelUp(){

    userSequence =[];
    level++;
    h3.innerText = `Level ${level}`;
    //random button choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    gameSequence.push(randColor);
    console.log(gameSequence);
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);

}

function checkAns(idx){
    if(userSequence[idx]===gameSequence[idx]){
        //console.log("same color");
        //console.log(level);
        if(highestScorevalue<level){
            //console.log("not zero");
            highestScorevalue=level;
            h2.innerHTML=`Your highest score is<b> ${highestScorevalue}`;
        }
        if(userSequence.length==gameSequence.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        //console.log("Game over! Press any key to start.");
        //console.log(level);
        h3.innerHTML=`Game over! Your score was <b>${level}</b><br> Press any key to start.`;
        
        if(highestScorevalue<level){
            //console.log("not zero");
            highestScorevalue=level;
            h2.innerHTML=`Your highest score is<b> ${highestScorevalue}`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset();
    }
}

function btnPress(){
    //console.log("btn pressed");
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    checkAns(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    userSequence=[];
    gameSequence=[];
    level=0;
}
