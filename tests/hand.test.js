const { test, expect } = require("@jest/globals");
const { number } = require("yargs");
const classes = require("../js/card-deck-hand-player-classes");
const playerHand = new classes.Hand("hand-player-1");
const cards = [new classes.Card("A", "diamonds"), new classes.Card("J", "hearts")];

test("Checking if the correct PLAYER's HAND ID is assigned to the Hand object or not", () => {
      expect(playerHand.playerHandId).toBe("hand-player-1");
});

test("Intially there are no cards in a player's hand", () => {
      expect(playerHand.cards.length).toBe(0);
});

test("Checking whether the given card(s) pushed into the Hand Object", () => {
      playerHand.pushCard(cards[0], cards[1]);
      expect(playerHand.cards.length).toBe(2);
});

test("Checking the computed value of the hand", () => {
      expect(playerHand.computeValue()).toEqual([11, 21]);
});


