// var faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
// var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
// var deck = [];
// var cash = [];


$(document).ready(function(){


  var deck = [];
  var dealerHand = [];
  var playerHand = [];
  var playerPoints = 0;
  var dealerPoints = 0;
  var currentHand;
  var deckCount;
  var countCards = true;
  var playerCash = 2500;
  var playerBet;
  var letsPlayBtn = $('#startGame');
  var dealBtn = $('#deal-button');
  var hideDealer = true;


  letsPlayBtn.on('click', startGame);
  dealBtn.on('click', function(){
    dealPlayer();
    dealDealer();
  });

  // Bet object
  function Bets() {
      this.pot = 500;
      this.bet = 0;
      $('#bet').text(0);
      $('#pot').text('$' + this.pot);
  }


  // Deck
  function Deck() {
    deck = [];
    deckCount = 0;
    if (countCards){console.log("Shuffling Deck");}
    // Loop over each point value
    for (var points = 1;  points < 14; points++) {
        var suits =['spades','hearts','clubs','diamonds'];
        // Loop over each suit
        for (var suit in suits) {
            // Add each suit as an object to deck array
            deck.push(new Card(points,suits[suit]));
        } // End suit for loop
    } // End point for loop
  }


  // Draw card object
  function drawCard (min, max) {
    //set min amount of cards in deck
    //set max amount of cards in deck
    var min = 1;
    var max = 52;
    //use Math.random function using min and max values as parameters and assign to a variable name
    var randomNum = Math.floor(Math.random() * (min - max) * -1) + min;
    //console.log(deck[randomNum]);
    //return the random card from the deck
    return deck[randomNum];
  }

// build card
  function buildCard (cardObject){
    var cardObj = cardObject;
    var pcards = [];
    var dcards = [];
     if (cardObj){
      if (cardObj.length == 1){
      }else {
        for (var i = 0; i < cardObj.length; i++) {
            var point = cardObj[i].point;
            var suit = cardObj[i].suit;
            var card = '<div class="card">';
            switch(point) {
              case 1:
                  point = 'Ace';
                  break;
              case 11:
                  point = 'Jack';
                  break;
              case 12:
                  point = 'Queen';
                  break;
              case 13:
                  point = 'King';
                  break;
            }
            card += '<div class="card-number">'+ point +'</div>';
            card += '<div class="card-suit">'+ suit +'</div>';

            if(cardObj[i].holder === 'player'){
              pcards.push(cardObj[i]);
              $('.player-cards').append(card);
            }else {
              dcards.push(cardObj[i]);
              $('.dealer-cards').append(card);
            }
          }
        }
     }
     countDealerCards(dcards);
     countPlayerCards(pcards);




  }


  function welcome(){
    console.log('WELCOME TO BLACKJACK!');
  }


  function startGame(){
      $('.start-game-module').hide();
  //popup saying welcome
  welcome();
  placeBets();
  //create new deck
  Deck();
  //deal the cards
  }


  function placeBets(bet){
  //if playerCash is greater than 0 continue function
  //if bet amount is less than playerCash amount continue
  //if(playerCash >= bet amount){
  //playerCash = playerCash - bet amount
  //}
    var betAmount = 10;
  //   console.log(playerCash);
    if(playerCash > 0){

      if(playerCash >= betAmount){
          playerCash -= betAmount;
  //         console.log(playerCash);
      }
    }
  // dealPlayer();
  // dealDealer();
  // countCards();
  }


  function dealPlayer(){
    //Player gets two cards both face up.
    var firstCard = drawCard();
    var secondCard = drawCard();
    playerHand = [firstCard, secondCard];
    playerHand[0].holder = 'player';
    playerHand[1].holder = 'player';
    buildCard(playerHand);

  }

  function dealDealer(){
  //give the Dealer two cards with one face down
    var firstCard = drawCard();
    var secondCard = drawCard();
    dealerHand = [firstCard, secondCard];
    dealerHand[0].holder = 'dealer';
    dealerHand[1].holder = 'dealer';
    buildCard(dealerHand);
  }





  function countPlayerCards(playersHand){
    var sum;
    if (playersHand){
      if (playersHand.length == 1){
      }else {
        for (var i = 0; i < playersHand.length; i++) {
          console.log('point: ', playersHand[i].point);
            sum =+ playersHand[i].point;
            console.log('index: ', i+1);
            console.log('length: ', playerHand.length);

            if((i+1) == playerHand.length){
              console.log('sum: ', sum);
            }
        }
      }

     }

  //extract sum of points from player hand

  //if sum of card points is greater than 21 call LOSE()
  if (playerPoints > 21) {console.log('YOU LOSE')
  //if sum is equal to 21 flip the dealers hole card

  }
  //if dealer sum is not equal to 21 call WIN()
  }


  function countDealerCards(dealersHand){
    //extract sum of points from dealer hand

    //if sum of card points is greater than 21 call LOSE()
    if (playerPoints > 21) {
      console.log('YOU LOSE')
    }
  }


  function hit(){
  //if card points are less than 21 then pull random card from deck and add to player hand
  }


  function stay(){
  //if card points are less than or equal to 21
  }


  function win(){
  reset();
  startGame();
  }


  function lose(){
  reset();
  startGame();
  }


  function flipDealerCard(){
  //flip hole card from dealer
  //count dealer card points
  //if card points are less than 17, dealer draws another random card
  }


  function reset(){
  // reset game values
  // dealerHand = [];
  // playerHand = [];
  // playerPoints = 0;
  // dealerPoints = 0;
  // countCards = true;
  // playerCash = 400;
  }

  // Card Object
  function Card(value,suit) {
      this.point = value;
      this.suit = suit;
  }
});


