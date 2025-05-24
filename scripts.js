const score=JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  losses:0,
  ties:0
}


let autoPlaying = false ;
let intervalId;
function autoPlay(){
  if (!autoPlaying){
    intervalId = setInterval(()=>{
      const playerMove = pickComputerMove()
      playGame(playerMove)
    },1000)
    autoPlaying = true 
  } else {
    clearInterval(intervalId);
    autoPlaying = false;
  }
}

document.querySelector('.rock-button')
  .addEventListener('click',() =>{
    playGame('rock')
  })
document.querySelector('.paper-button')
  .addEventListener('click',() => {
    playGame('paper')
  })
document.querySelector('.scissor-button')
  .addEventListener('click',() => {
    playGame('scissors')
  })
document.querySelector('.js-auto-play-button')
  .addEventListener('click',()=>{
    autoPlay()
  })
document.querySelector('.js-reset-button')
  .addEventListener('click',()=>{
    score.wins=0
    score.losses=0
    score.ties=0
    localStorage.removeItem('score')
    updateScore() 
  })

document.body.addEventListener('keydown',(event) =>{
  if(event.key ==='r'){
    playGame('rock')
  } else if (event.key === 'p'){
    playGame('paper')
  } else if (event.key === 's'){
    playGame('scissors')
  }
})
document.body.addEventListener('keydown',(event)=>{
  if(event.key ==='a'){
    autoPlay()
  }else if(event.key ==='Backspace'){
    score.wins=0
    score.losses=0
    score.ties=0
    localStorage.removeItem('score')
    updateScore() 
  }
})


updateScore()
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie';
      } else if (computerMove === 'paper') {
        result = 'You lose';
      } else if (computerMove === 'scissors') {
        result = 'You win';
      }
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win';
      } else if (computerMove === 'paper') {
        result = 'Tie';
      } else if (computerMove === 'scissors') {
        result = 'You lose';
      }
    } else if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose';
      } else if (computerMove === 'paper') {
        result = 'You win';
      } else if (computerMove === 'scissors') {
        result = 'Tie';
      }
    }
    if (result==='You win'){
      score.wins+=1
    }else if (result==='You lose'){
      score.losses+=1
    }else if(result==='Tie'){
      score.ties+=1
    }

    updateScore()

    document.querySelector('.js-result').innerHTML= result

    document.querySelector('.js-moves').innerHTML= `You     
    <img src="images/${playerMove}-emoji.png" class="icons">
    <img src="images/${computerMove}-emoji.png" class="icons"> Computer`
   
    localStorage.setItem('score',JSON.stringify(score))

  }
  
  function updateScore(){
    document.querySelector('.js-score').innerHTML=`wins:${score.wins} losses:${score.losses} ties:${score.ties}`
  }
  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else {
      computerMove = 'scissors';
    }
    return computerMove;
  }