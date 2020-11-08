const { test, expect } = require("@jest/globals");
const { exec } = require("child_process");
const { number } = require("yargs");
const classes = require("../js/card-deck-hand-player-classes");

const player1 = new classes.Player("player-1");
const cards = [
    new classes.Card("10", "clubs"),
    new classes.Card('5', 'spades'),
    // expected hand value = [15, 15]
] 

test("Testing if a player's ID properly stored in the object", () => {
      expect(player1.id).toBe("player-1");
});

test("Whether the cards are properly inserted to the player's hand", () => {
    player1.giveCard(cards[0]);
    player1.giveCard(cards[1]);
    expect(player1.hand.cards).toEqual(cards);
});

test("Checking whether the hand value is properly computed", ()=> {
    expect(player1.computeHandValue()).toEqual([15, 15]);
});
