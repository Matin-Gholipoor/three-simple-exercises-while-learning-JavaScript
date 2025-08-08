const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

score.reset = function () {
  this.wins = 0;
  this.losses = 0;
  this.ties = 0;
  localStorage.removeItem('score');

  document.querySelector('.js-score-text').innerText =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

document.querySelector('.js-score-text').innerText =
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

function calculateResult(playerChoice) {
  let result;
  let computerChoice = Math.random() * 3;

  if (computerChoice >= 0 && computerChoice < 1)
    computerChoice = 'rock';
  else if (computerChoice >= 1 && computerChoice < 2)
    computerChoice = 'paper';
  else
    computerChoice = 'scissors';

  if (computerChoice === 'rock') {
    if (playerChoice === 'rock')
      result = 'tie';
    else if (playerChoice === 'paper')
      result = 'win';
    else
      result = 'loss';
  } else if (computerChoice === 'paper') {
    if (playerChoice === 'rock')
      result = 'loss';
    else if (playerChoice === 'paper')
      result = 'tie';
    else
      result = 'win';
  } else {
    if (playerChoice === 'rock')
      result = 'win';
    else if (playerChoice === 'paper')
      result = 'loss';
    else
      result = 'tie';
  }

  if (result === 'win') {
    score.wins++;
    document.querySelector('.js-result').innerText = 'You win';
  } else if (result === 'loss') {
    score.losses++;
    document.querySelector('.js-result').innerText = 'You lose';
  } else {
    score.ties++;
    document.querySelector('.js-result').innerText = 'Tie'
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-score-text').innerText =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.querySelector('.js-choice-row').innerHTML = `
      <img src="images/angry player.jpg">
      <p>You: </p>
      <img src="Emojies/${playerChoice}-emoji.png">
      <img src="Emojies/${computerChoice}-emoji.png">
      <p> :Mr. Comp</p>
      <img src="images/angry computer.jpg">
    `;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  calculateResult('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  calculateResult('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  calculateResult('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
  document.querySelector('.js-overlay').classList.remove('overlay-hidden');
});

document.querySelector('.js-reset-score-button-no').addEventListener('click', () => {
  document.querySelector('.js-overlay').classList.add('overlay-hidden');
});

document.querySelector('.js-reset-score-button-yes').addEventListener('click', () => {
  score.reset();
  document.querySelector('.js-overlay').classList.add('overlay-hidden');
});

document.body.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'r':
      calculateResult('rock');
      break;
    case 'p':
      calculateResult('paper');
      break;
    case 's':
      calculateResult('scissors');
      break;
    case 'Delete':
      score.reset();
  }
})