
// Set up variables and document references

var timerEl = document.getElementById("countdown");
var startQuizBtn = document.getElementById("start-quiz");
var landingPage = document.getElementById("landing-page");


// Button event listeners
startQuizBtn.addEventListener("click", beginQuiz);



// define functions

function beginQuiz() {
    landingPage.classList.add("hide");
}



