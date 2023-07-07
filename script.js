'use strict';

//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnTar = document.querySelector('.btn--tar');

//starting condition
/*score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let curScore = 0;
let activePlayer = 0;
let playing = true;*/

let scores, curScore, activePlayer, playing;

const init = function () {
  // score0El.textContent = 0;
  // score1El.textContent = 0;
  scores = [0, 0];
  curScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.querySelector('.pl0').textContent = play0;
  document.querySelector('.pl1').textContent = play1;
  btnTar.textContent = `🎯Target ${score}`;

  btnHold.classList.remove('hidden');

  btnRoll.classList.remove('hidden');

  btnTar.classList.remove('hidden');

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//data reading
const score = Number(prompt('Enter the target🎯 set to score (Number 1-100)'));
const play0 = prompt('Enter the name of player 1');
const play1 = prompt('Enter the name of player 2');

if (score) {
  init();
} else {
  alert('You need to set target🎯 in order to play');
  setTimeout(function () {
    location.reload();
  }, 1000);
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    //2 display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3 check for roll 1 to next player
    if (dice !== 1) {
      //add dice to current score
      curScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;
      // first current0El.textContent = curScore; //change required
    } else {
      //switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      curScore = 0;
      activePlayer = activePlayer == 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1 add current score to active player
    scores[activePlayer] += curScore;

    diceEl.classList.add('hidden');

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2 check for >=100

    if (scores[activePlayer] >= score) {
      //finish the game
      playing = false;

      document.querySelector(`.pl${activePlayer}`).textContent =
        activePlayer == 0 ? `${play0} won 🏆` : `${play1} won 🏆`;

      diceEl.classList.add('hidden');

      btnHold.classList.add('hidden');

      btnRoll.classList.add('hidden');

      btnTar.classList.add('hidden');

      current0El.textContent = 0;

      current1El.textContent = 0;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      //switch player
    }
  }
});

btnNew.addEventListener('click', init);

// btnTar.addEventListener('click', function () {});

// Game rules
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclosemodal = document.querySelector('.close-modal');
const btnsopenmodal = document.querySelectorAll('.show-modal');
//console.log(btnsopenmodal.length);

const openmodal = function () {
  console.log('btn clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  //modal.style.display = 'block';
};

const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsopenmodal.length; i++)
  btnsopenmodal[i].addEventListener('click', openmodal);

btnclosemodal.addEventListener('click', closemodal);

overlay.addEventListener('click', closemodal);

document.addEventListener('keydown', function (e) {
  console.log('key');
  console.log(e.key);
});
