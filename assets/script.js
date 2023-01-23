
// Set up variables and document references

var timerEl = document.getElementById("countdown");
var startQuizBtn = document.getElementById("start-quiz");
var landingPage = document.getElementById("landing-page");
var questionDisplay = document.getElementById("questions");
var questionText = document.getElementById("question-text")
var multipleChoices = document.getElementById("multiple-choices");
var nextQuestionBtn = document.getElementById("next-question");
var checkAnswerEl = document.getElementById("check-answer");

var secondsLeft = 60;
var countdown;
var randomLoad, current;

// Question array to be used as index in beginQuiz function
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
        question: "This tool is extremely useful for degbugging javascript errors when creating javascript code",
        choices: [
            { text: "function expression", right: false },
            { text: "append.Child", right: false },
            { text: "local storage", right: false },
            { text: "console.log", right: true }
        ]
    },
    {
        question: "Which of the below choices is not a javascript datatype?",
        choices: [
            { text: "numerical", right: false },
            { text: "freudian", right: true },
            { text: "boolean", right: false },
            { text: "string", right: false }
        ]
    },
    {
        question: "Non-curly brackets are typically used when creating",
        choices: [
            { text: "arrays", right: true },
            { text: "straight lines", right: false },
            { text: "git pulls", right: false },
            { text: "styling properties", right: false }
        ]
    },
    {
        question: "In relation to HTML & CSS, Javascript is best used for",
        choices: [
            { text: "page layout", right: false },
            { text: "page styling", right: false },
            { text: "user interaction", right: true },
            { text: "emailing supervisors", right: false }
        ]
    }
];


// Button event listeners
startQuizBtn.addEventListener("click", beginQuiz);
nextQuestionBtn.addEventListener("click", () => {
    current++
    showNextQuestion()
});



// defined functions


function timer() {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
        endQuiz();

    }
};


function beginQuiz() {
    countdown = setInterval(timer, 1000);
    
    landingPage.classList.add("hide");

    randomLoad = questionIndex.sort(() => Math.random() - .5)
    current = 0
    questionDisplay.classList.remove("hide");

    // timer();
    showNextQuestion();


};

function showNextQuestion() {
    resetView();
    showMeQuestion(randomLoad[current]);
};



function showMeQuestion(question) {
    questionText.innerText = question.question;
    
    question.choices.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.right) {
            button.dataset.right = answer.right
        };
        button.addEventListener("click", chooseAnswer)
        multipleChoices.appendChild(button);

    })

};

function resetView() {
    nextQuestionBtn.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (multipleChoices.firstChild) {
        multipleChoices.removeChild
            (multipleChoices.firstChild)
    }

};

function chooseAnswer(event) {
    var chosenAnswer = event.target;
    var right = chosenAnswer.dataset.right;
    checkAnswerEl.classList.remove("hide")

    if(right) {
        checkAnswerEl.innerHTML = "That's Correct. NICE!";
    } else {
        checkAnswerEl.innerHTML = "Wrong answer!";
        if (secondsLeft <=10) {
            secondsLeft = 0;
        } else {
            secondsLeft -= 10;
        }
    }

    Array.from(multipleChoices.children).forEach(button => {
        showStanding(button, button.dataset.right)
    })

    if (randomLoad.length > current + 1) {
        nextQuestionBtn.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startQuizBtn.classList.remove("hide")
        endQuiz();
    }
};

function showStanding(element, right) {
    removeStanding(element)
    if(right) {
        element.classList.add("right")

    } else {
        element.classList.add("wrong");
    }
}


function removeStanding (element) {
    element.classList.remove("right");
    element.classList.remove("wrong");
}

function endQuiz() {
    clearInterval(countdown);
    timerEl.textContent = "Time: " + secondsLeft;
    setTimeout(function () {
        questionDisplay.classList.add("hide");
        document.getElementById("stats").classList.remove("hide");
        document.getElementById("score").textContent = "You finished with " + secondsLeft + " seconds left";
    },3000)
};

