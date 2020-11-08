$("#start-btn").on("click", beginRound);

const dealer = new Player("dealer");
const players = [];
const deck1 = new Deck();
const firstRound = [];
let activePlayer = 0; // holds the player index whose turn is now

$("#hit-btn").hide();
$("#stay-btn").hide();

$("#hit-btn").on("click", hit);
$("#stay-btn").on("click", stay);
$("#start-btn").hide().show(600);

// animation effects on the restart button
$("#restart-btn").on("click", function () {
      $("#hit-btn").hide(1000);
      $("#stay-btn").hide(1000);
      $(".players-area").hide(1000);
      $(".dealer").hide(1000, ()=> {
            $("#restart-btn").hide(600, ()=> {
                  location.reload();
            });
      });
});

$("#restart-btn").hide();

/**
 * Initiates the round 1 of blackjack
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
function beginRound() {
      // creating players
      // number of players must be 1 - 5
      const num = prompt("How Many players? (2 - 5)");
      if (num < 2 || num > 5) {
            alert("Enter a valid Number");
            return;
      }
      const playerHands = [];
      for (let i = 1; i <= num; i++) {
            console.log("Creating players");
            let tmp = `<div class = "player" id =  "player-${i}"> 
            <div class = "hand", id = "hand-player-${i}"> </div>
            <div class = "player-name" id = "name-player-${i}">player-${i}</div>
        </div>`;
            let obj = new Hand(`hand-player-${i}`);
            playerHands.push(obj);
            $(".players-area").append(tmp);
            let playerObj = new Player(`player-${i}`);
            players.push(playerObj);
      }
      console.log("Players Created!");
      deck1.shuffleDeck(); // shuffling the deck

      //   popping cards for the first round
      for (let i = 0; i < num * 2 + 2; i++) {
            let temp = deck1.popCard();
            firstRound.push(temp);
      }

      // two cards to dealer
      // one flipped and one visible

      dealer.giveCard(firstRound.shift());
      firstRound[0].flipCard(true);
      dealer.giveCard(firstRound.shift());

      // rest cards to the players
      // fetching the array of players' hands
      // iterating through each player's hand
      // and creating Hand Objects

      players.forEach((player) => {
            player.giveCard(firstRound.shift());
            player.giveCard(firstRound.shift());
      });
      players[activePlayer].toggle();
      setInterval(() => {
            deck1.getNumberOfCards();
            $(".deck").find("p").fadeOut(500);
            $(".deck").find("p").fadeIn(500);
      }, 0);

      // the change of buttons after
      // the completition of first round
      $("#start-btn").hide(1000);
      $("#restart-btn").show(1000);
      $("#hit-btn").show(1000);
      $("#stay-btn").show(1000);
      $(".blackjack").hide(1000);
      $(".deck").show(1000);
      return num;
}

/**
 * The HIT function :)
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
function hit() {
      if (players[activePlayer].status === "hit") {
            players[activePlayer].giveCard(deck1.popCard());
            consolify("NICE HIT! " + players[activePlayer].id);

            // when last player HITS and exceeds 21
            if (activePlayer === players.length - 1 && players[activePlayer].handValue.every((value) => value > 21)) {
                  console.log(activePlayer + " OUT");
                  players[activePlayer].toggle();
                  players[activePlayer].status = "out";
                  consolify("YOU GOTTA GO TOO " + players[activePlayer].id);
                  $("#hit-btn").hide(1000);
                  $("#stay-btn").hide(1000);
                  findWinner();
            }
            // when players before the last one HIT and exceed 21
            else if (players[activePlayer].handValue.every((value) => value > 21)) {
                  console.log(activePlayer + " OUT");
                  players[activePlayer].toggle();
                  players[activePlayer].status = "out";
                  consolify("YOU GOTTA GO " + players[activePlayer].id);
                  activePlayer++;
                  players[activePlayer].toggle();
            }
      }
}

/**
 * The STAY function
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
function stay() {
      // When players before the last one STAY
      if (activePlayer < players.length - 1) {
            players[activePlayer].status = "stay";
            players[activePlayer].toggle();
            consolify("YOU CHOSE TO STAY " + players[activePlayer].id);
            activePlayer++;
            players[activePlayer].toggle();
      }
      // when last player STAY
      else if (activePlayer === players.length - 1) {
            players[activePlayer].status = "stay";
            players[activePlayer].toggle();
            consolify("YOU CHOSE TO STAY " + players[activePlayer].id);
            $("#hit-btn").hide(1000);
            $("#stay-btn").hide(1000);
            findWinner();
      }
}
// print messages on console
function consolify(str) {
      $(".console").text(str).hide().fadeIn(100).delay(2000).fadeOut(2000);
}
/**
 * let's find the winner
 * (logic is a lil messy)
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
function findWinner() {
      // show dealer's hidden card
      dealer.hand.cards[1].flipCard(false);
      $(`#${dealer.hand.cards[1].id}`).remove();
      dealer.hand.cards[1].renderCardById("dealer-hand");

      // if dealer's hand's value is less than 17
      // continue to draw cards
      while (dealer.handValue.every((value) => value < 17)) {
            dealer.giveCard(deck1.popCard());
            console.log(dealer.handValue);
      }

      // if dealer's hand exceeds 21
      if (dealer.handValue.some((value) => value > 21)) {
            consolify("Dealer Exceeds 21! Everyone Takes their money home!");
      } else {
            // if it doesnt exceed 21, then we check the wiiner
            let theGreaterValueOfDealersHand = dealer.handValue[1];
            let eligiBlePlayers = players.filter((player) => player.status === "stay");
            eligiBlePlayers.sort((p1, p2) => p2.handValue[1] - theGreaterValueOfDealersHand - (p1.handValue[1] - theGreaterValueOfDealersHand));
            console.log(eligiBlePlayers);
            consolify(eligiBlePlayers[0].id + " WINS!");
      }
}
