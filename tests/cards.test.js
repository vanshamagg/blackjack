const { test, expect } = require("@jest/globals");
const { strict } = require("yargs");
const classes = require("../js/card-deck-hand-player-classes");

const myCard = new classes.Card("10", "spades");



test("Testing if the card is created with the proper value, color and other attributes", () => {
      expect(myCard.value).toBe("10");
      expect(myCard.suit).toBe("spades");
      expect(myCard.id).toBe("spades-10");
      expect(myCard.suitChar).toBe(String.fromCharCode(0x2660));
      expect(myCard.color).toBe("blue");
});

test("On creating, the card must not be flipped, i.e. it's front side is visible", () => {
      expect(myCard.isFlipped).toBe(false);
});

test("Flipping the card, and checking whether it is flipped", () => {
      expect(myCard.flipCard(true)).toBe(true);
});

test("Testing the Render Card Function ",  ()=> {
    expect(myCard.renderCardById("Something")).toBe(true);
});
