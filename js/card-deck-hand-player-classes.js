class Card {
  constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.isFlipped = false;
        this.id = `${suit}-${value}`;

        if (this.suit === "spades") this.suitChar = String.fromCharCode(0x2660);
        else if (this.suit === "clubs") this.suitChar = String.fromCharCode(0x2663);
        else if (this.suit === "diamonds") this.suitChar = String.fromCharCode(0x2666);
        else this.suitChar = String.fromCharCode(0x2665);

        this.color = this.suit === "spades" || this.suit === "clubs" ? "blue" : "red";
  }
  flipCard(value) {
        // false for upside
        // true for backside
        this.isFlipped = value;
        return undefined;
  }

  getCard() {
        return this;
  }

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
  popCard() {
        return this.deckOf52.pop();
  }

  getNumberOfCards() {
        $(".deck").find("p").text(this.deckOf52.length);
  }
}


class Hand {
      constructor(playerHandId) {
            this.playerHandId = playerHandId;
            this.cards = [];
            this.handValue = undefined;
      }

      pushCard(...cards) {
            for (let i = 0; i < cards.length; i++) {
                  this.cards.push(cards[i]);
            }
            return cards.length;
      }

      renderHandByID() {
            this.cards.forEach((element) => {
                  element.renderCardById(this.playerHandId);
            });
            return true;
      }

      pushAndRenderCard(card) {
            this.cards.push(card);
            card.renderCardById(this.playerHandId);
      }

      computeValue() {
            let temp = [0, 0];

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

      getHand() {
            return this;
      }
}

class Player {
      constructor(id) {
            this.id = id;
            this.hand = new Hand(this.getHandId());
            this.status = "hit";
            this.bet = undefined;
            this.handValue = undefined;
      }

      getHandId() {
            let handId = $(`#${this.id}`).find(".hand").attr("id");
            return handId;
      }

      giveCard(card) {
            this.hand.pushAndRenderCard(card);
            this.computeHandValue();
            return card;
      }

      computeHandValue() {
            this.handValue = this.hand.computeValue();
            return this.handValue;
      }

      toggle() {
            $(`#${this.id}`).find(".player-name").toggleClass("active");


      }
}
