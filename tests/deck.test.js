const { test, expect } = require('@jest/globals');
const classes = require('../js/card-deck-hand-player-classes');

const myDeck =  new classes.Deck()

test("Checking if a Deck is created by seeing the number of cards", ()=> {
    expect(myDeck.deckOf52).toHaveLength(52);
});

test("Testing if the cards are created less than 52", ()=> {
    expect(myDeck.deckOf52.length).not.toBeLessThan(52);
});

test("Testing if the cards are created greter than 52", ()=> {
    expect(myDeck.deckOf52.length).not.toBeGreaterThan(52);
});

test("Deck is created without shuffling, first card should be A of Spades", ()=> {
    expect(myDeck.deckOf52[0]).toHaveProperty('value', 'A');
    expect(myDeck.deckOf52[0]).toHaveProperty('suit', 'spades');
});

test("Deck is created without shuffling, last card should be K of Hearts", ()=> {
    expect(myDeck.deckOf52[51]).toHaveProperty('value', 'K');
    expect(myDeck.deckOf52[51]).toHaveProperty('suit', 'hearts');
});

test("Deck is shuffled with Deck.shuffleDeck()", ()=> {
    const oldDeck = myDeck.deckOf52.slice(0, 52);
    myDeck.shuffleDeck();
    expect(oldDeck).not.toEqual(myDeck.deckOf52);
});

test("the popCard() function pops the top card in the deck Stack", ()=> {
    const topCard =  myDeck.popCard();
    expect(myDeck.deckOf52[myDeck.deckOf52.length - 1]).not.toEqual(topCard);
});