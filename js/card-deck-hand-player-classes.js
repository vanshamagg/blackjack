// const $ = require("jquery");
/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * @description The Object based implementation of a 
 * simple playing card
 */
class Card {
      constructor(value, suit) {
            /**
             * The Numeric Value of the card
             */
            this.value = value;
            /**
             * The suite of the card
             */
            this.suit = suit;
            /**
             * if the top side is set to visible or the
             * back side. Set to 'false' for value and suite
             * to be visible
             */
            this.isFlipped = false;
            /**
             * the HTML id of the card
             */
            this.id = `${suit}-${value}`;

            if (this.suit === "spades") this.suitChar = String.fromCharCode(0x2660);
            else if (this.suit === "clubs") this.suitChar = String.fromCharCode(0x2663);
            else if (this.suit === "diamonds") this.suitChar = String.fromCharCode(0x2666);
            else this.suitChar = String.fromCharCode(0x2665);

            /**
             * The card with which the card will be rendered on the DOM;
             * Set this to whatever you like.
             */
            this.color = this.suit === "spades" || this.suit === "clubs" ? "blue" : "red";
      }
      /**
       * Sets the 'isFlipped' property of the Card
       * @param {Boolean} value 'isFlipped'
       */
      flipCard(value) {
            // false for upside
            // true for backside
            this.isFlipped = value;
            return this.isFlipped;
      }
      /**
       * returns the Card object
       */
      getCard() {
            return this;
      }
      /**
       * renders the card on the DOM
       * @param {str} id The HTML 'id' attr
       */
      renderCardById(id) {
            // render using ID
            if (this.isFlipped === false) {
                  $(`#${id}`).append(`<div class = "card" id =  "${this.id}"> </div>`);
                  $(`#${this.id}`).append(`<div class = "card-value">${this.value}</div>`);
                  $(`#${this.id}`).append(`<div class = "card-suite">${this.suitChar}</div>`);
                  $(`#${this.id}`).css("color", `${this.color}`);
                  $(`#${this.id}`).hide();
                  $(`#${this.id}`).show(600);
            } else {
                  $(`#${id}`).append(`<div class = "card-flipped" id =  "${this.id}"> </div>`);
                  $(`#${this.id}`).append(`<div class = "card-value">${this.value}</div>`);
                  $(`#${this.id}`).append(`<div class = "card-suite">${this.suitChar}</div>`);
                  $(`#${this.id}`).hide();
                  $(`#${this.id}`).show(600);
            }
            return true;
      }
}
/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * @description A Deck of 52 Cards
 */
class Deck {
      constructor() {
            /**
             * stores all the cards
             */
            this.deckOf52 = [];
            /**
             * creates Card Objects and populates the Deck
             */
            this.createDeck();
      }
      /**
       * Creates a deck of 52 cards
       */
      createDeck() {
            let suits = ["spades", "diamonds", "clubs", "hearts"];
            let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

            for (let i = 0; i < suits.length; i++) {
                  for (let j = 0; j < values.length; j++) {
                        let card = new Card(values[j], suits[i]);
                        this.deckOf52.push(card);
                  }
            }

            return this.deckOf52;
      }
      /**
       * Shuffles the deck, we shuffle a 1000 times here
       */
      shuffleDeck() {
            for (let i = 1; i <= 1500; i++) {
                  let location1 = Math.floor(Math.random() * this.deckOf52.length);
                  let location2 = Math.floor(Math.random() * this.deckOf52.length);
                  let temp = this.deckOf52[location1];

                  this.deckOf52[location1] = this.deckOf52[location2];
                  this.deckOf52[location2] = temp;
            }
            return true;
      }
      /**
       * pops the cards on the top of the stack
       */
      popCard() {
            return this.deckOf52.pop();
      }
      /**
       * renders the 'length' property of the deck on DOM
       */
      getNumberOfCards() {
            $(".deck").find("p").text(this.deckOf52.length);
      }
}
/**
 * Represents the player's collection of dealt/drawn cards
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
class Hand {
      constructor(playerHandId) {
            /**
             * the DOM 'id' of the specified player's hand
             */
            this.playerHandId = playerHandId;
            /**
             * holds the Card Objects
             */
            this.cards = [];
            /**
             * computed value of the hand as per the blackjack rules
             */
            this.handValue = undefined;
      }
      /**
       * 
       * @param  {...any} cards Card Objects
       */
      pushCard(...cards) {
            for (let i = 0; i < cards.length; i++) {
                  this.cards.push(cards[i]);
            }
            return cards.length;
      }
      /**
       * renders every card in the Hand on DOM
       */
      renderHandByID() {
            this.cards.forEach((element) => {
                  element.renderCardById(this.playerHandId);
            });
            return true;
      }
      /**
       * pushes the Card in the stack and then renders it on DOM
       * @param {Object} card Card Object
       */
      pushAndRenderCard(card) {
            this.cards.push(card);
            card.renderCardById(this.playerHandId);
      }
      /**
       * computes the value of the hand as per the blackjack rules
       */
      computeValue() {
            let temp = [0, 0];
            /**
             * The value map of the cards
             * as per the BlackJack rules.
             */
            const valueMap = {
                  A: [1, 11],
                  2: 2,
                  3: 3,
                  4: 4,
                  5: 5,
                  6: 6,
                  7: 7,
                  8: 8,
                  9: 9,
                  10: 10,
                  J: 10,
                  Q: 10,
                  K: 10,
            };
            this.cards.forEach((card) => {
                  if (card.value === "A") {
                        temp[0] += valueMap["A"][0];
                        temp[1] += valueMap["A"][1];
                  } else {
                        temp[0] += valueMap[card.value];
                        temp[1] += valueMap[card.value];
                  }
            });
            // console.log("TEMP", temp)
            this.handValue = temp;
            return temp;
      }
      /**
       * returns the Hand object itself
       */
      getHand() {
            return this;
      }
}
/**
 * The class that represents the Blackjack player himself
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
class Player {
      constructor(id) {
            /**
             * DOM id of the player
             */
            this.id = id;
            /**
             * player's hand
             */
            this.hand = new Hand(this.getHandId());
            /**
             * the status of the player.
             * Can be set to 'hit', 'stay', 'out', 'won'
             */
            this.status = "hit";
            /**
             * the current bet amount of the player
             */
            this.bet = undefined;
            /**
             * the player's hand's value
             */
            this.handValue = undefined;
      }
      /**
       * returns the DOM id attr of the player's hand
       */
      getHandId() {
            let handId = $(`#${this.id}`).find(".hand").attr("id");
            return handId;
      }
      /**
       * pushes a Card to the Player's Hand,
       * renders it on DOM and
       * computes the hand value dynamically
       * @param {Object} card Card Object
       */
      giveCard(card) {
            this.hand.pushAndRenderCard(card);
            this.computeHandValue();
            return card;
      }
      /**
       * computes the value of the hand as per 
       * the blackjack rules
       */
      computeHandValue() {
            this.handValue = this.hand.computeValue();
            return this.handValue;
      }
      /**
       * toggles the player to active or inactive and renders the appropriate
       * CSS class
       */
      toggle() {
            $(`#${this.id}`).find(".player-name").toggleClass("active");
      }
}

// module.exports.Card = Card;
// module.exports.Deck = Deck;
// module.exports.Hand = Hand;
// module.exports.Player = Player;
