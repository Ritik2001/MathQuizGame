//Using Math object methods
const problemelement=document.querySelector(".problem")
const ourform=document.querySelector(".our-form")
const inputBar=document.querySelector(".inputBar")
const status=document.querySelector(".status-description")
const pointsNeeded=document.getElementById("pointsNeeded")
const mistakesAllowed= document.getElementById("mistakesAllowed")
const progressBar=document.querySelector(".progress-inner")
const message=document.querySelector(".pop-message")
const resetButton=document.querySelector(".reset-button")
const maxScore= 10
const maxmistakesallowed =2
let state={
  score: 0,
  wronganswer: 0
}

updateProblem()

function generateRandomNo(num){// 0 to num

  return Math.floor(Math.random()*(num+1))
}

function generateRandomQuestion()
{
return {
    firstNumber: generateRandomNo(10),
    secondNumber: generateRandomNo(10),
    operator:["+","-","X"][generateRandomNo(2)]
    }

}

function updateProblem(){
  state.currentProblem=generateRandomQuestion()
  problemelement.innerHTML=`${state.currentProblem.firstNumber} ${state.currentProblem.operator} ${state.currentProblem.secondNumber}`
}

ourform.addEventListener("submit",function(form){
  form.preventDefault()
  if(parseInt(inputBar.value, 10) === findSolution())
    {
      state.score++
      pointsNeeded.textContent= maxScore- state.score
      progressBar.style.transform=`scaleX(${state.score/10})`
    }
    else{
      state.wronganswer++
      mistakesAllowed.textContent= maxmistakesallowed- state.wronganswer
      problemelement.classList.add("animate-wrong")
      setTimeout(() =>problemelement.classList.remove("animate-wrong") ,331)
    }
    inputBar.value=""
    inputBar.focus()
    checklogic()
    updateProblem()
})

resetButton.addEventListener("click",resetGame)
function findSolution()
{
  const p=state.currentProblem
  if(p.operator == "X"){
  return  p.firstNumber * p.secondNumber
  }
  else if(p.operator == "+")
    {
      return p.firstNumber + p.secondNumber
     }
  else {
    return p.firstNumber - p.secondNumber
    }
}
function checklogic(){

  if(state.score == maxScore)
  {
    message.textContent="Congrats! You won."
    document.body.classList.add("overlay-is-visible") // To add a class Selector to body element
    setTimeout(() => resetButton.focus(),331)
  }
   if(state.wronganswer == maxmistakesallowed)
   {
     message.textContent="Sorry! You Lost"
     document.body.classList.add("overlay-is-visible")
     setTimeout(() => resetButton.focus(),331)

   }
}

function resetGame()
{

  document.body.classList.remove("overlay-is-visible")
  updateProblem()
  state.score= 0
  state.wronganswer= 0
  pointsNeeded.textContent= 10
  mistakesAllowed.textContent= 2
  renderprogressBar()
}
function renderprogressBar()
{
  progressBar.style.transform=`scaleX(${state.score/10})`
}

// document.body.innerHTML="<h1>New Way</h1>"
console.log("javascript working");
