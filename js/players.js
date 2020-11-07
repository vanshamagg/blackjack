

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
    this.status = "none";
    this.bet = undefined;
    this.handValue =  undefined;
  }

  getHandId() {
    let handId = $(`#${this.id}`).find(".hand").attr("id");
    return handId;
  }

  giveCard(card) {
    this.hand.pushAndRenderCard(card);
    return card;
  }

  computeHandValue(){
      this.handValue = this.hand.computeValue();
      return this.handValue;
  }
}
