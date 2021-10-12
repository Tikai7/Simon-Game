
const cyan_div = document.getElementById("color_1");
const red_div = document.getElementById("color_2");
const yellow_div = document.getElementById("color_3");
const green_div = document.getElementById("color_4");

let computerTurn = true;
let playerTurn = false;
let player_moove = [];
let computer_moove = [];
let couleurs = [0,1,2,3];
let intervalID=this;
let same = true;
let interval_color = 800;
let audio;

document.getElementById("play").addEventListener("click",function(){
    reset();
    play_audio("audio/Click.mp3");
    interval_color = 800;
    reset_txt();
    play();
})
function play_audio(link)
{
    audio = new Audio(link)
    audio.play();
}

function play() {
    if(computerTurn)
    {
        intervalID = setInterval(click_color,interval_color);
    }
}
function player_play()
{
    document.getElementById("status").innerHTML = "A votre tour";
}

cyan_div.addEventListener("click",function(){
    if(playerTurn)
         pre_check(0);
});
red_div.addEventListener("click",function(){
    if(playerTurn)
        pre_check(1);
});
yellow_div.addEventListener("click",function(){
    if(playerTurn)
        pre_check(2);
});
green_div.addEventListener("click",function(){
    if(playerTurn)
        pre_check(3);
});

function check()
{
   
    for(let i in player_moove)
    {
        if(player_moove[i] != computer_moove[i]){
            same = false;
        }   
        console.log(player_moove);
        console.log(computer_moove);
    }

    if(same)
    {
        document.getElementById("status").innerHTML = " Bien joué ";
        setTimeout(function(){play_audio("audio/win.mp3");},100);
        reset();
        setTimeout(reset_txt,800);
        interval_color -= 10;
        if(interval_color<= 100)
            interval_color = 100;

        setTimeout(play,1000);
    }
    else{
        reset();
        finish();
    }
       
}
function reset()
{
    computerTurn = true;
    playerTurn = false;
    player_moove = [];
    computer_moove = [];
    couleurs = [0,1,2,3];
    intervalID=this;
    same = true;
}
function finish()
{

    setTimeout(function (){play_audio("audio/lose.mp3");},200);
    reset();
    interval_color = 800;
    computerTurn = false;
    playerTurn = false;
    document.getElementById("status").innerHTML = " Perdu ! ";
    setTimeout(reset_game,800);
    
}
function reset_txt(){
    document.getElementById("status").innerHTML = "Retenez la séquence";
}
function reset_game() {
    document.getElementById("status").innerHTML = "Appuyez sur jouer";
}
function pre_check(i)
{
    setColor(i);   
    player_moove.push(i);
    console.log(player_moove);
    if(player_moove.length == 4 && computer_moove.length == 4){
        check();
    }
 
}
function click_color()
{
    let n = couleurs[Math.floor(Math.random()*4)];
    setColor(n);
    computer_moove.push(n);
    console.log(computer_moove);
    if(computer_moove.length == 4){
        clearInterval(intervalID);
        computerTurn = false;
        playerTurn = true;
        player_moove = [];
        player_play();
    }
}
function setColor(n)
{
    if(n == 0){
        cyan_div.style.WebkitFilter  = "brightness(50%)";
        play_audio("audio/Do.mp3");
    }
    else if (n == 1){
        red_div.style.WebkitFilter  = "brightness(50%)";
        play_audio("audio/RE.mp3");
     
    }
    else if (n == 2){
        yellow_div.style.WebkitFilter  = "brightness(50%)";
        play_audio("audio/MI.mp3");
    }
    else{
        green_div.style.WebkitFilter  = "brightness(50%)";
        play_audio("audio/Fa.mp3"); 
    }   
    setTimeout(clearColor,300);
    
 
}
function clearColor()
{
    cyan_div.style.WebkitFilter  = "brightness(100%)";
    red_div.style.WebkitFilter  = "brightness(100%)";
    yellow_div.style.WebkitFilter  = "brightness(100%)";
    green_div.style.WebkitFilter  = "brightness(100%)";
}