$(document).ready(function() {

    var deck = [];
    var dealerHand = [];
    var playerHand = [];
    var playerPoints;
    var dealerPoints;
    var currentHand;
    var deckCount;
    var playerCash = 2500;
    var playerBet;
    var letsPlayBtn = $('#startGame');
    var dealBtn = $('#deal-button');
    var hitBtn = $('#hit-button');
    var standBtn = $('#stand-button');
    var betButtons = $('.bet-buttons')
    var playAgain = $('.play-again');
    var cashContainer = $('.player-cash');
    var betContainer = $('.player-bet');
    var placeBetText = $('.place-bets');
    var hideDealer = true;

    // Event Handlers
    letsPlayBtn.on('click', startGame);
    dealBtn.on('click', deal);
    hitBtn.on('click', hit);
    standBtn.on('click', stand);
    playAgain.on('click', function(){
        $('.win').removeClass('show');
        $('.lose').removeClass('show');
        placeBetText.addClass('show');
        betButtons.addClass('show');
        betContainer.html('<h3>Player Bet:</h3>');
        reset();
    });
    $('.bet-btn').on('click', function(){
        var betAmount = $(this).attr('data-value');
        placeBets(betAmount);
    });
    


    //functions
    function startGame() {
        blackjack();
        blackjack.player = new Player('Travis');
        blackjack.dealer = new Dealer();
        $('.start-game-module').hide();
        placeBetText.addClass('show');
        betButtons.addClass('show');
        $('.play-buttons').removeClass('show');
    }

    function placeBets(bet) {
        console.log('Bet: ', bet);
        var betAmount = bet;
        blackjack.player.bet += Number(betAmount);
        betContainer.html('<h3>Player Bet: $'+ blackjack.player.bet +'</h3>');
        betButtons.addClass('remove');
        placeBetText.addClass('remove');
        $('.play-buttons').addClass('show');

    }

    function executeBet(){
        if(blackjack.player.win){
            console.log('bet win');
            if (blackjack.player.currency >= blackjack.player.bet) {         
                blackjack.player.currency += blackjack.player.bet;
                cashContainer.html('<h3>Player Wallet: $'+ blackjack.player.currency +'</h3>');
            } 
        }else {
            console.log('bet loose');
            if (blackjack.player.currency >= blackjack.player.bet) {         
                blackjack.player.currency -= blackjack.player.bet;
                cashContainer.html('<h3>Player Wallet: $'+ blackjack.player.currency +'</h3>');
            }
        }
        
    }

    function blackjack(){
        this.init = function(){
            console.log('Games has Started');
        }(),
        this.welcome = function(){  
            console.log('WELCOME TO BLACKJACK!');
        },
        this.deck = [],
        // Card Object
        this.card = function(value, suit){    
            this.point = value;    
            this.suit = suit;
        },
        this.createDeck = function(){  
            console.log("Shuffling Deck");
            for(var points = 1; points < 14; points++){      
                var suits = ['spades', 'hearts', 'clubs', 'diamonds']; 
                for (var suit in suits) {          
                    this.deck.push(new this.card(points, suits[suit])); 
                }
            }
            deck = this.deck;
        }();
    }

    // Draw card object
    function drawCard(min, max){ 
        var min = 1;  
        var max = 52;
        var randomNum = Math.floor(Math.random() * (min - max) * -1) + min;   
        //console.log('num rand: ', deck[randomNum]);
        return deck[randomNum];
    }
    
    function buildCard(cardObj){
        if(cardObj){
            var point = cardObj.point;
            var suit = cardObj.suit;
            var card = '<div class="card">';
            switch(point) {
                case 1:
                    point = 'Ace';
                    cardObj.value = 'Ace';
                    break;
                case 11:
                    point = 'Jack';
                    cardObj.value = 'Jack';
                    break;
                case 12:
                    point = 'Queen';
                    cardObj.value = 'Queen';
                    break;
                case 13:
                    point = 'King';
                    cardObj.value = 'King';
                    break;
                default:
                    cardObj.value = cardObj.point;
            }
            card += '<div class="card-number">' + point + '</div>';
            card += '<div class="card-suit">' + suit + '</div>';
            if (cardObj.holder === 'player') {
                $('.player-cards').append(card);
                countCards(cardObj);
            } else {
                $('.dealer-cards').append(card);
                countCards(cardObj);
            }
        }
    }

    function countCards(){
        if(blackjack.player.cards){
            countPlayerCards();
        }
        if(blackjack.dealer.cards){
            countDealerCards();
        }
    }

    function countPlayerCards(){
        var playerSum = [];
        var pcards = blackjack.player.cards;
        for (var i = 0; i < pcards.length; i++) {
            if (pcards[i].point > 10) {
                pcards[i].point = 10;
            }
            playerSum.push(pcards[i].point);
        }
        blackjack.player.points = countArray(playerSum);
        $('.playerPoints').html('<h3>'+ blackjack.player.points +'</h3>');
        if(blackjack.player.points > 21){
            $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
            $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
            blackjack.player.win = false;
            console.log('monny');
            lose();
        }
    }
    function countDealerCards(){
        var dealerSum = [];
        var dcards = blackjack.dealer.cards;
        for (var i = 0; i < dcards.length; i++) {
            if (dcards[i].point > 10) {
                dcards[i].point = 10;
            }
            dealerSum.push(dcards[i].point);
        }
        blackjack.dealer.points = countArray(dealerSum);
        console.log('Dealer Sum: ',blackjack.dealer.points);
        if(blackjack.player.points < 22){
            if(blackjack.dealer.points === 21){
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                blackjack.player.win = false;
               console.log('daddy');
                lose();
            }
            if(blackjack.dealer.points > 21){
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                blackjack.player.win = true;
                win();
            }
        }
        
    }

    function Player(name){
        this.name = name;
        this.currency = 2500;
        this.cards = [];
        this.points = 0;
        this.turn = false;
        this.holder = 'player';
        this.bet = 0;
    }

    function Dealer(){
        this.name = 'Dealer';
        this.cards = [];
        this.cardsShowing = [];
        this.points = 0;
        this.turn = false;
        this.holder = 'dealer';
    }

    function deal() {
        dealBtn.css('display', 'none');
        placeBetText.removeClass('show');
        betButtons.removeClass('show');
        var card1 = drawCard();
        var card2 = drawCard();
        var carda = drawCard();
        var cardb = drawCard();
        card1.holder = 'player';
        card2.holder = 'player';
        carda.holder = 'dealer';
        cardb.holder = 'dealer'; 
        blackjack.player.cards = [card1, card2];
        blackjack.dealer.cards = [carda, cardb];
        $.each(blackjack.player.cards, function( index, card ) {
          buildCard(card);
        }, $.each(blackjack.dealer.cards, function( index, card ) {
          buildCard(card);
        }) );
        cashContainer.html('<h3>Player Wallet: $'+ blackjack.player.currency +'</h3>');
        
    }

    function countArray(array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }

    function hit(){
        var newcard = drawCard();
        newcard.holder = 'player';
        blackjack.player.cards.push(newcard);
        buildCard(newcard);
        if(blackjack.player.points > 22){
            $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
           $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
           blackjack.player.win = false;
           console.log('hillary');
           lose();
        }else {
            hitDealer();
        }
    }

    function hitDealer(){
        var newcard = drawCard();
        newcard.holder = 'dealer';
        blackjack.dealer.cards.push(newcard);
        $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
        buildCard(newcard);
        if(blackjack.player.points === 21){
            $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
            $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
            blackjack.player.win = true;
            win();
        }
    }

    function stand(){
        var playerPoints = blackjack.player.points;
        var dealerPoints = blackjack.dealer.points;
        blackjack.stand = true;
        if(dealerPoints > 17){
           if(playerPoints > dealerPoints){
               $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
               $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
               blackjack.player.win = true;
               console.log('grumpoy');
               win();
           }
           if(playerPoints < dealerPoints){
               $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
               $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
               blackjack.player.win = false;
               console.log('hillary');
               lose();
           }
           if(playerPoints === dealerPoints){
               $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
               reset();
           }
        }
        else if(playerPoints > dealerPoints){
           $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
           $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
           do {
               hitDealer();
               stand();
               if(blackjack.dealer.points > 22){
                    $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                    $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                    blackjack.player.win = true;
                    console.log('bones');
                    win();
               }
               if(blackjack.dealer.points === 21){
                     $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                   $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                   blackjack.player.win = false;
                    console.log('monkey');
                   lose();
               }
           }
           while (blackjack.dealer.points < 18);
        }
        else {
           $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
           $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
           blackjack.player.win = false;
           lose();
        }
    }

    function reset(){
        blackjack.player.bet = 0;
        $('.play-buttons').removeClass('show');
        $('.playerPoints').html('');
        $('.dealerPoints').html('');
        $('.player-cards').html('');
        $('.dealer-cards').html('');
        dealBtn.css('display', 'inline-block');
        $('.dealer-cards').find('.card:nth-child(1)').removeClass('show-card');
    }

    function win() {
        executeBet();
        $('.win').addClass('show');
        //startGame();
    }

    function lose() {
        executeBet();
        dealBtn.css('display', 'inline-block');
        $('.lose').addClass('show');
        //startGame();
    }
});
