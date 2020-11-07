

// const num = prompt("How Many players?");
// const num = 3;
$("#start-btn").on("click", beginRound);
const dealer = new Player("dealer");
const players = [];

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

  let deck1 = new Deck();
  deck1.shuffleDeck();
  //   popping cards for the first round
  const firstRound = [];
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
    console.log(player.computeHandValue());
  });

  setInterval(() => {
    deck1.getNumberOfCards();
    $(".deck").find("p").fadeOut(500);
    $(".deck").find("p").fadeIn(500);
  }, 0);

  $("#start-btn").attr("disabled", "true");
  return num;
}
