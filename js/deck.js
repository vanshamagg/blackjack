
class Card {
    constructor(value, suit) {
        this.value  = value;
        this.suit = suit;
        this.isFlipped =  false;
        this.id =  `${suit}-${value}`;
        
        if (this.suit === 'spades')
            this.suitChar =  String.fromCharCode(0X2660);
        else if ( this.suit ===  'clubs') 
             this.suitChar =  String.fromCharCode(0X2663);
        else if ( this.suit ===  'diamonds') 
             this.suitChar =  String.fromCharCode(0X2666);
        else
            this.suitChar =  String.fromCharCode(0X2665);

        this.color =  (this.suit === 'spades' || this.suit === 'clubs') ? "black" : "red";
    }
    flipCard(value) {
        this.isFlipped =  value;
        return undefined
    }
    
    getCard() {
        return {
            "id": this.id,
            "suit": this.suit,
            "value" : this.value,
            "color": this.color,
            "flipped":this.isFlipped,
            "suitCharacter": this.suitChar,
        }
    }

    renderCard(str) {
        console.log("rendering card");
        
        if (this.isFlipped === false) {
            $(str).append(`<div class = "card" id =  "${this.id}"> </div>`);
            $(`#${this.id}`).append(`<div class = "card-value">${this.value}</div>`);
            $(`#${this.id}`).append(`<div class = "card-suite">${this.suitChar}</div>`);
            $(`#${this.id}`).css("color", `${this.color}`);
        }
        else {
            $(str).append(`<div class = "card card-flipped" id =  "${this.id}"> </div>`);
            $(`#${this.id}`).append(`<div class = "card-value">${this.value}</div>`);
            $(`#${this.id}`).append(`<div class = "card-suite">${this.suitChar}</div>`);
            
        }
       
    }

}
class Deck {
    constructor() {
       this.deckOf52 = [];
       this.createDeck();
    }
    /**
     * Creates a deck of 52 cards
     */
    createDeck() {
        let suits = ['spades', 'diamonds', 'clubs', 'hearts'];
        let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for(let i = 0; i<suits.length; i++) {
            for(let j=0; j<values.length; j++) {
                let card =  new Card(values[j], suits[i])
                this.deckOf52.push(card);
            }
        
        }
        
        return this.deckOf52;
    }
    /**
     * Shuffles the deck, we shuffle a 1000 times here 
     */
    shuffleDeck() {
        for(let i =1; i<=1000; i++) {
            let location1  =  Math.floor(Math.random() * this.deckOf52.length);
            let location2  =  Math.floor(Math.random() * this.deckOf52.length);
            let temp =  this.deckOf52[location1];
            
            this.deckOf52[location1] =  this.deckOf52[location2];
            this.deckOf52[location2] =  temp;

        }
        console.log(this.deckOf52);
        return true;
    } 
    popCard() {
        return this.deckOf52.pop();
    }

    renderDeck() {
        $(".deck").text(this.deckOf52.length);
    }   
    
}

