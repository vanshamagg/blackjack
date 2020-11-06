const num = prompt("How Many players?");
console.log(num);

let beginRound = function() {
    
    // creating players 
    for(let i = 1; i <= num; i++) {
        console.log("Creating players");
        let tmp  =  `<div class = "player" id =  "player-${i}"> 
            <div class = "hand", id = "hand-player-${i}"> </div>
        </div>`;
        $(".players-area").append(tmp);
        
    }

    let deck1 =  new Deck();
    deck1.shuffleDeck();
    const firstRound = []
    for (let i =0 ; i< num*2+2; i++) {
        let temp =  deck1.popCard();
        firstRound.push(temp);
    }

    // two cards to dealer
    
    firstRound.shift().renderCard($(".dealer").find(".hand"));
    firstRound[0].flipCard(true);
    firstRound.shift().renderCard($(".dealer").find(".hand"));
    
    // rest cards to the players
    
    const playersHands =  $(".players-area").find(".hand");

    // iterating through each player's hand
    $(playersHands).each( function () {
        let id  =  $(this).attr("id");
        firstRound.shift().renderCardById(id);
        firstRound.shift().renderCardById(id);
        console.log(id);
    })

    deck1.getNumberOfCards();

    $(".deck").find("p").fadeOut(600);

    setInterval( ()=> {
        $(".deck").find("p").fadeOut(500);
        $(".deck").find("p").fadeIn(500);
    },0);

    clearInterval();
    $("#start-btn").attr("disabled", "true");
    
}

$("#start-btn").on('click', beginRound);

