/* Adittional rules

1. A player looses his entire score when he rolls two 6 in the row. After that,
it's next player's turn.
2. Add an input field to the HTML where playes can set the winning score, 
so that they can change the predefined score of 100.
3. Add another dice to the game, so that there are two dices now. 
The player looses his score when one of them is a 1.
*/

var scores, roundScore, activePlayer, gamePlaying;

gamePlaying = true;

init();

var lastDices = [];

var dices = document.querySelectorAll('.dice');
function hideDices(dices) {
    dices.forEach( function(element) {
        element.style.display = 'none';
    });
}

hideDices(dices);


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dicesValue =[];

        // 2. Display the result
        var diceList = document.querySelectorAll('.dice');
        diceList.forEach(
            function (element, index) {
                element.style.display = 'block';
                dicesValue[index] = Math.floor(Math.random() * 6) + 1;
                element.src = 'dice-' + dicesValue[index] + '.png';
            }
        );

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dicesValue[0] === 6 && lastDices[0] === 6 || 
            dicesValue[1] === 6 && lastDices[0] === 6 || 
            dicesValue[0] === 6 && lastDices[1] === 6 ||
            dicesValue[0] === 6 && lastDices[1] === 6) {
            // Erase score for active player
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dicesValue[0] !== 1 && dicesValue[1] !== 1) {
            // Add score
            roundScore += dicesValue[0] + dicesValue[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }

        lastDices[0] = dicesValue[0];
        lastDices[1] = dicesValue[1];
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check is player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDices(dices);;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDices(dices);
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
