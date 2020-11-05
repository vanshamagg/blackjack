/**
 * CARDS API
 * @author Vansham Aggarwal
 * A simple JS class to create and manipulate a deck of
 * 52 cards
 */

 /**
  * A class container methods and properties to 
  * create and manipulate a deck of cards
  * 
  */
class Deck {
    constructor() {
        console.log("Deck Created");  
        $("body").append("<div class ='deck'></div>");
        this.deck = this.createDeck();
    }
    /**
     * Creates a deck of 52 cards
     */
    createDeck() {
        let suits = ['spades', 'diamonds', 'clubs', 'hearts'];
        let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let deck = new Array();
        for(let i = 0; i<suits.length; i++) {
            for(let j=0; j<values.length; j++) {
                let card = {suit: suits[i], value: values[j]};
                deck.push(card);
            }
        
        }
        return deck;
    }
    /**
     * Shuffles the deck, we shuffle a 1000 times here 
     */
    shuffleDeck() {
        for(let i =1; i<=1000; i++) {
            let location1  =  Math.floor(Math.random() * this.deck.length);
            let location2  =  Math.floor(Math.random() * this.deck.length);
            let temp =  this.deck[location1];
            
            this.deck[location1] =  this.deck[location2];
            this.deck[location2] =  temp;

        }
        return true;
    } 
    /**
     * renders the deck on the DOM 
     */
    renderDeck() {
        for(let i = 0; i < this.deck.length; i++ ) {
            let id =  `${this.deck[i].suit}-${this.deck[i].value}`;
            $(".deck").append(`<div class = 'card' id = ${id}></div>`);
            if (this.deck[i].suit  === 'hearts' || this.deck[i].suit  === 'diamonds') {
                
                $(`#${id}`).css("color", "red");
            }
            $(`#${id}`).append(`<div class = 'value'> ${this.deck[i].value} </div> `);
            if (this.deck[i].suit === 'spades') {
                $(`#${id}`).append(`<div class = "suit">${String.fromCharCode(0X2660)}</div>`);
            }
            else if (this.deck[i].suit === 'clubs') {
                $(`#${id}`).append(`<div class = "suit">${String.fromCharCode(0X2663)}</div>`);
            }
            else if (this.deck[i].suit === 'diamonds') {
                $(`#${id}`).append(`<div class = "suit">${String.fromCharCode(0X2666)}</div>`);
            }
            else {
                $(`#${id}`).append(`<div class = "suit">${String.fromCharCode(0X2665)}</div>`);
            }
            
            $(`#${id}`).on('mouseover', function() {
                $(this).css( {
                    "background-color":"blue"
                });
            });
            $(`#${id}`).on('mouseleave', function() {
                $(this).css( {
                    "background-color":"white"
                });
            });
                    
            
        }
    }
}

let deck1 =  new Deck();
console.log("New Deck Created");
deck1.renderDeck();

$("#btn1").on('click', function () {
    
    deck1.shuffleDeck();
    $(".card").remove();
    deck1.renderDeck();
    $(".deck").css("display", "none");
    $(".deck").fadeIn(600);
})

