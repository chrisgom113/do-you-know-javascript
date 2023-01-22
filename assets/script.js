
// Set up variables and document references

var timerEl = document.getElementById("countdown");
var startQuizBtn = document.getElementById("start-quiz");
var landingPage = document.getElementById("landing-page");

var secondsLeft = 60;
var countdown;

var questionIndex = [
    {
        question: "'Javascript' and 'Java' are indentical terms and mean the same thing in the coding world",
        choices: [
            { text: "Yes", right: false },
            { text: "No", right: true },
            { text: "Maybe", right: false },
            { text: "Not enough information to answer correctly", right: false }
        ]
    },
    {
        question: "",
        choices: [
            { text: "", right: false },
            { text: "", right: false },
            { text: "", right: false },
            { text: "", right: true }
        ]
    },
    {
        question: "",
        choices: [
            { text: "", right: false },
            { text: "", right: true },
            { text: "", right: false },
            { text: "", right: false }
        ]
    },
    {
        question: "",
        choices: [
            { text: "", right: true },
            { text: "", right: false },
            { text: "", right: false },
            { text: "", right: false }
        ]
    },
    {
        question: "",
        choices: [
            { text: "", right: false },
            { text: "", right: false },
            { text: "", right: true },
            { text: "", right: false }
        ]
    }
];
// Button event listeners
startQuizBtn.addEventListener("click", beginQuiz);



// define functions


function timer() {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
        endGame();

    }
}
function beginQuiz() {
    landingPage.classList.add("hide");

    countdown = setInterval(timer, 1000);




}



