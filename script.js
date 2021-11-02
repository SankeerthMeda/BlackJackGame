let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': "#your-box", 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': "#dealer-box", 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': 1 },
    'wins':0,
    'losses':0,
    'draws':0,
};
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('swish.m4a');
const winSound=new Audio("cash.mp3");
const lossSound=new Audio("aww.mp3");
document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
function blackJackHit() {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    console.log(YOU['score']);
    showScore(YOU);
}
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = card + '.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackjackDeal() {
    let winner=computeWinner();
    showResult(winner);
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    console.log(yourImages);
    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    let dealImages = document.querySelector('#dealer-box').querySelectorAll('img');
    console.log(dealImages);
    for (let i = 0; i < dealImages.length; i++) {
        dealImages[i].remove(); 
    }
    document.querySelector(YOU['scoreSpan']).innerHTML = 0;
    document.querySelector(YOU['scoreSpan']).style.color='black';
    document.querySelector(DEALER['scoreSpan']).innerHTML = 0;
    document.querySelector(DEALER['scoreSpan']).style.color='black';
    // document.querySelector(YOU['scoreSpan']).style.backgroundColor='none';
    YOU['score']=0;
    DEALER['score']=0;
}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        // document.querySelector(activePlayer['scoreSpan']).style.backgroundColor = 'white';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score'];
        // console.log(activePlayer['score'])
    }
}
function blackjackStand(){
    dealerLogic();
}
function dealerLogic(){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
}
//compute winner
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            // console.log("YOU winner");
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            // console.log("dealer winner");
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score']){
            // console.log("its a draw");
            blackjackGame['draws'];
        }
    }
    else if(YOU['score']>21&&DEALER['score']<=21){
        // console.log("YOU Lost");
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if(YOU['score']>21&&DEALER['score']>21){
        // console.log('drew');
        blackjackGame['draws']++;
        
    }
    // console.log("Winner is ",winner);
    console.log(blackjackGame);
    return winner;
}
function showResult(winner){
    let message,messageColor;
    if(winner===YOU){
        document.querySelector('#wins').innerHTML=blackjackGame['wins'];
        message="You won!";
        messageColor="green";
        winSound.play();
    }
    else if(winner===DEALER){
        document.querySelector('#losses').innerHTML=blackjackGame['losses'];
        message="You lost!";
        messageColor="red";
        lossSound.play();
    }
    else{
        
        document.querySelector('#draws').innerHTML=blackjackGame['draws'];
        message="You drew!";
        messageColor="black";
    }
    document.querySelector('#blackjack-result').innerHTML=message;
    document.querySelector('#blackjack-result').style.color=messageColor;

}