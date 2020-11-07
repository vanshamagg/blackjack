$("#start-btn").on("click", beginRound);
const dealer = new Player("dealer");
const players = [];
const deck1 = new Deck();
const firstRound = [];
let activePlayer = 0;

$("#hit-btn").hide();
$("#stay-btn").hide();

$("#hit-btn").on("click", hit);
$("#stay-btn").on("click", stay);
$("#start-btn").hide().show(600);

$("#restart-btn").on("click", function () {
      $("#hit-btn").hide(1000);
      $("#stay-btn").hide(1000);
      $(".players-area").hide(1000);
      $(".dealer").hide(1000);
});
$("#restart-btn").hide();

function beginRound() {
      // creating players
      const num = prompt("How Many players?");
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

      deck1.shuffleDeck();
      //   popping cards for the first round

      for (let i = 0; i < num * 2 + 2; i++) {
            let temp = deck1.popCard();
            firstRound.push(temp);
      }

      // two cards to dealer
      //   one flipped and one visible

      dealer.giveCard(firstRound.shift());
      firstRound[0].flipCard(true);
      dealer.giveCard(firstRound.shift());

      //   console.log(dealersHand.computeValue());
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

      $("#start-btn").hide(1000);
      $("#restart-btn").show(1000);
      $("#hit-btn").show(1000);
      $("#stay-btn").show(1000);
      $(".blackjack").hide(1000);
      $(".deck").show(1000);
      return num;
}

// the HIT FUNCTION
function hit() {
      if (players[activePlayer].status === "hit") {
            // players[activePlayer].id;
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

// STAY FUNCTION
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

function findWinner() {
      // show dealer's hidden card
      dealer.hand.cards[1].flipCard(false);
      $(`#${dealer.hand.cards[1].id}`).remove();
      // console.log(dealer.hand.cards[1]);
      dealer.hand.cards[1].renderCardById("dealer-hand");

      // if dealer's hand's value is less than 16
      // console.log(dealer.handValue);
      while (dealer.handValue.every((value) => value < 17)) {
        console.log("VANSHAM");
            dealer.giveCard(deck1.popCard());
            console.log(dealer.handValue);
      }

      if (dealer.handValue.some((value) => value > 21)) {
            consolify("Dealer Exceeds 21! Everyone Takes their money home!");
      } else {
            let theGreaterValueOfDealersHand = dealer.handValue[1];
            let eligiBlePlayers = players.filter((player) => player.status === "stay");
            eligiBlePlayers.sort((p1, p2) => p2.handValue[1] - theGreaterValueOfDealersHand - (p1.handValue[1] - theGreaterValueOfDealersHand));
            console.log(eligiBlePlayers);
            consolify(eligiBlePlayers[0].id + " WINS!");
      }
}
