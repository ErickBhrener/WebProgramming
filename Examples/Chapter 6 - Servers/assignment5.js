//Name= Erick Silva
//email= ericksilva@csu.fullerton.edu
//github = 

var http = require('http');
var url = require('url');
var history = {"outcome":"","wins":0,"losses":0,"ties":0};
gameWords = new Array(5);
gameWords[0] = "rock";
gameWords[1] = "lizard";
gameWords[2] = "spock";
gameWords[3] = "scissors";
gameWords[4] = "paper";

var move = function (request, response,playerMove){
    rand = Math.floor(Math.random() * gameWords.length);
    computerMove = gameWords[rand];

    if(computerMove==playerMove){
        history.outcome = "tie";
        history.ties += 1; 
    }else if(playerMove == "rock"){
        if(computerMove=="lizard" || computerMove == "scissors"){
            history.outcome = "win";
            history.wins += 1; 
        }else{
            history.outcome = "lose";
            history.losses += 1;
        }
    }else if(playerMove == "lizard"){
        if(computerMove=="spock" || computerMove=="paper"){
            history.outcome = "win";
            history.wins += 1; 
        }else{
            history.outcome = "lose";
            history.losses += 1;
        }
    }else if(playerMove=="spock"){
        if(computerMove=="rock" || computerMove=="scissors"){
            history.outcome = "win";
            history.wins += 1;
        }else{
            history.outcome = "lose";
            history.losses += 1;
        }
    }else if(playerMove=="scissors"){
        if(computerMove=="lizard" || computerMove=="paper"){
            history.outcome = "win";
            history.wins += 1;
        }else{
            history.outcome = "lose";
            history.losses += 1;
        }
    }else if(playerMove=="paper"){
        if(computerMove=="rock" || computerMove=="spock"){
            history.outcome = "win";
            history.wins += 1;
        }else{
            history.outcome = "lose";
            history.losses += 1;
        }
    }
};

function processRequest(request, response) {
    "use strict";

    var pathname = url.parse(request.url).pathname;
    var path = pathname.split("/");
    move(request,response,path[2]);
    var aux = JSON.stringify(history,null,4);
    console.log(aux);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(aux);
    response.end();
}

http.createServer(processRequest).listen(8888);