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
    var playAgain = $('.play-again');
    var hideDealer = true;
    letsPlayBtn.on('click', startGame);
    dealBtn.on('click', deal);
    hitBtn.on('click', hit);
    standBtn.on('click', stand);
    playAgain.on('click', function(){
        $('.win').removeClass('show');
        $('.lose').removeClass('show');
        reset();
    });

    function startGame() {
        $('.start-game-module').hide();
        blackjack();
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
        console.log('CardObject being Built: ', cardObj);
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
        console.log('player-SUM: ', blackjack.player.points);
        $('.playerPoints').html('<h3>'+ blackjack.player.points +'</h3>');
        if(blackjack.player.points > 21){
            $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
            $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
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
        console.log('Dealer-SUM: ', blackjack.dealer.points);
        if(blackjack.player.points < 22){
            if(blackjack.dealer.points > 21){
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                win();
            }
        }
        
    }

    function Player(name){
        this.name = name;
        this.currency = 0;
        this.cards = [];
        this.points = 0;
        this.turn = false;
        this.holder = 'player';
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
        blackjack.player = new Player('Travis');
        blackjack.dealer = new Dealer();
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
        });
        $.each(blackjack.dealer.cards, function( index, card ) {
          buildCard(card);
        });
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
        console.log('NewCard: ',newcard);
        newcard.holder = 'player';
        blackjack.player.cards.push(newcard);
        buildCard(newcard);
        hitDealer();
    }

    function hitDealer(){
        var newcard = drawCard();
        console.log('NewCard: ',newcard);
        newcard.holder = 'dealer';
        blackjack.dealer.cards.push(newcard);
        buildCard(newcard);
    }

    function stand(){
        var playerPoints = blackjack.player.points;
        var dealerPoints = blackjack.dealer.points;

        if(dealerPoints > 17){
            if(playerPoints > dealerPoints){
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                win();
            }
            if(playerPoints < dealerPoints){
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                lose();
            }
            if(playerPoints === dealerPoints){
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                hitPlayer();
                hitDealer();
            }
        }
        else {
            if(playerPoints > dealerPoints){
                $('.dealer-cards').find('.card:nth-child(1)').addClass('show-card');
                $('.dealerPoints').html('<h3>'+ blackjack.dealer.points +'</h3>');
                hitDealer();
            }
        }
    }

    function placeBets(bet) {
        var betAmount = 10;
        if (playerCash > 0) {
            if (playerCash >= betAmount) {         
                playerCash -= betAmount;
            }  
        }
    }

    function reset(){
        delete blackjack.player;
        delete blackjack.deck;
        $('.playerPoints').html('');
        $('.dealerPoints').html('');
        $('.player-cards').html('');
        $('.dealer-cards').html('');
        dealBtn.css('display', 'inline-block');
        $('.dealer-cards').find('.card:nth-child(1)').removeClass('show-card');
        console.log('PLAYER END',blackjack.player);
    }

    function win() {
        //reset();
        console.log('win');
        $('.win').addClass('show');
        //startGame();
    }

    function lose() {
        //reset();
        console.log('lose');
        $('.lose').addClass('show');
        //startGame();
    }
});
