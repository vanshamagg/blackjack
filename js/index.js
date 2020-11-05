



let beginRound = function() {
    let deck1 =  new Deck();
    deck1.shuffleDeck();

    card3 =  deck1.popCard();

    card3.renderCard(".hand");
    card4 =  deck1.popCard();

    card4.flipCard(true);
    card4.renderCard(".hand");
    deck1.renderDeck();

}