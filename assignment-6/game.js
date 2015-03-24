function Game(){
    this.gameWords = new Array(5);
    this.gameWords[0] = "rock";
    this.gameWords[1] = "lizard";
    this.gameWords[2] = "spock";
    this.gameWords[3] = "scissors";
    this.gameWords[4] = "paper";
};
Game.prototype.getMove = function (playerMove,history){
    rand = Math.floor(Math.random() * this.gameWords.length);
    computerMove = this.gameWords[rand];

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
    return history;
}
module.exports = Game;