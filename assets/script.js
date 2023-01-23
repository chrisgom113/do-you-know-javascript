
// Set up variables and ID references

var timerEl = document.getElementById("countdown");
var startQuizBtn = document.getElementById("start-quiz");
var landingPage = document.getElementById("landing-page");
var questionDisplay = document.getElementById("questions");
var questionText = document.getElementById("question-text")
var multipleChoices = document.getElementById("multiple-choices");
var nextQuestionBtn = document.getElementById("next-question");
var submitScore = document.getElementById("submit-btn");
var checkAnswerEl = document.getElementById("check-answer");
var initialsEl = document.getElementById("input-initials");
var yourScore = document.getElementById("score");
var highScoresLink = document.getElementById("view-high-scores");
var clearScoresBtn = document.getElementById("clear-legend");
var restartBtn = document.getElementById("start-over");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var secondsLeft = 60;
var countdown;
var randomLoad, current;

// Question and multiple choice answer array to be used as index for beginQuiz and subsequent functions. 
// The array has nested arrays and in some cases arrays nested within already nested arrays.
var questionIndex = [
    {
        question: "'Javascript' and 'Java' are indentical terms and mean the exact same thing in the coding world",
        choices: [
            { text: "True", right: false },
            { text: "False", right: true },
            { text: "Maybe", right: false },
            { text: "Not enough information to answer correctly", right: false }
        ]
    },
    {
        question: "This tool is most useful for debugging errors and checking functionality when creating javascript code: ",
        choices: [
            { text: "declaring functions", right: false },
            { text: "append.Child method", right: false },
            { text: "local storage app", right: false },
            { text: "console.log function", right: true }
        ]
    },
    {
        question: "Which of the below choices is NOT a javascript datatype?",
        choices: [
            { text: "Numerical", right: false },
            { text: "Freudian", right: true },
            { text: "Boolean", right: false },
            { text: "String", right: false }
        ]
    },
    {
        question: "Non-curly brackets are typically used when creating",
        choices: [
            { text: "object arrays", right: true },
            { text: "straight lines", right: false },
            { text: "git pull commands", right: false },
            { text: "css styling", right: false }
        ]
    },
    {
        question: "To maintain good separation of concerns, Javascript is best used for",
        choices: [
            { text: "page layout", right: false },
            { text: "page styling", right: false },
            { text: "dynamic user interaction", right: true },
            { text: "emailing supervisors", right: false }
        ]
    }
];


// Buttons (event listeners)

// Begins the game by running beginQuiz function
startQuizBtn.addEventListener("click", beginQuiz);

// Navigates user to the next question by running showNextQuestion function
nextQuestionBtn.addEventListener("click", () => {
    current++
    showNextQuestion()
});

// Display scoreboard by running viewHighScores function
highScoresLink.addEventListener("click", viewHighScores);

// Submits user data to scoreboard by traversing the DOM and returning the inputted value and then running the viewHighScores function 
submitScore.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#input-initials").value;
    viewHighScores(initials);
});

// Reloads/refreshes the page to bring back to landing page title
restartBtn.addEventListener("click", function () {
    window.location.reload();
});

// Clears scoreboard by clearing local storage and also programmatically creates an empty string in the element with #best
clearScoresBtn.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("best").innerHTML = "";
});


// Functions

// timer (below)
// Runs the countdown timer at the top right of the screen. Function includes conditional statement to end the game (endQuiz) when time reaches '0'
function timer() {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
        endQuiz();

    }
};

// beginQuiz (below)
// Hides the landing page, starts the timer function. 
// Uses the sort and Math.random operator to shuffle the questions while also setting the index to a '0' position so that incrementing the index can begin. 
// Also displays the first shuffled question/answers in the array by running showNextQuestion
function beginQuiz() {
    countdown = setInterval(timer, 1000);

    landingPage.classList.add("hide");

    randomLoad = questionIndex.sort(() => Math.random() - .5)
    current = 0
    questionDisplay.classList.remove("hide");

    showNextQuestion();


};

// showNextQuestion (below)
// Runs resetView (see below) and runs showMeQuestion (see below) while passing parameters through to shuffle and start index count
function showNextQuestion() {
    resetView();
    showMeQuestion(randomLoad[current]);
};

// showMeQuestion (below)
// Traverses DOM to modify text to read as a question from the array
// Uses forEach loop to create a button element at the root and fill text with a multiple choice from the above array
// programatically adds a class selector using an if statement to traverse DOM and determine subclass based on right or wrong answer being selected
// adds event listener to button to run chooseAnswer function. 
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


// resetView (below)
// removes current elements and objects from view. 'While' statement ensures that current placeholders in HTML file are removed. 
// Jscript language will add objects from array
function resetView() {
    nextQuestionBtn.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (multipleChoices.firstChild) {
        multipleChoices.removeChild
            (multipleChoices.firstChild)
    }

};


// chooseAnswer (below)
// variable expression tied to event listener button 'target' from above 
// var 'right' creates object where the button selected is the 'right' one
// displays the text confirming right or wrong and selects either or based on if/then statement that checks the array nested array objects (boolean)
// if/then incorrect choice decrements time left by 10 seconds
function chooseAnswer(event) {
    var chosenAnswer = event.target;
    var right = chosenAnswer.dataset.right;
    checkAnswerEl.classList.remove("hide")

    if (right) {
        checkAnswerEl.innerHTML = "That's Correct. NICE!";
    } else {
        checkAnswerEl.innerHTML = "Wrong answer!";
        if (secondsLeft <= 10) {
            secondsLeft = 0;
        } else {
            secondsLeft -= 10;
        }
    }

    // array constructor indexes the 'from' & 'for each' in order to execute showStanding function at each object
    
    Array.from(multipleChoices.children).forEach(button => {
        showStanding(button, button.dataset.right)
    })

    // if/then statement determines which place in the index user is in to either show nextQuestion button or end game. Answer-checking text is also displayed. User is informed if answer was right or wrong.
    if (randomLoad.length > current + 1) {
        nextQuestionBtn.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startQuizBtn.classList.remove("hide")
        endQuiz();
    }
};


// showStanding (below)
// traverse DOM to add/modify css selectors based on right/wrong check. Parameters are passed through so function can be used as it is above
// runs removeStanding based on if/then statement
function showStanding(element, right) {
    removeStanding(element)
    if (right) {
        element.classList.add("right")

    } else {
        element.classList.add("wrong");
    }
}

// removes CSS modifiers on selected element
function removeStanding(element) {
    element.classList.remove("right");
    element.classList.remove("wrong");
}


// ends the game by clearing the time interval function and runs setTimeout function to display HTML elements for score and hiding question cards after 1 second
function endQuiz() {
    clearInterval(countdown);
    timerEl.textContent = "Time: " + secondsLeft;
    setTimeout(function () {
        questionDisplay.classList.add("hide");
        document.getElementById("stats").classList.remove("hide");
        document.getElementById("score").textContent = "You finished with " + secondsLeft + " seconds left!";
    }, 1000)
};

// creates object that uses jquery to pull input information
// creates object array to input inputted data 
var saveScores = function () {
    if (!legendBoard) {
        return false;
    }

    legendBoard = JSON.parse(legendBoard);
    var initials = document.getElementById("input-initials").value;
    var newScore = {
        score: secondsLeft,
        initials: initials
    }

    // adds newScore to array and logs into console
    legendBoard.push(newScore);
    console.log(legendBoard)

    // traverses DOM to add user inputs onto HTML elements
    legendBoard.forEach(score => {
        initialsEl.innerText = newScore.initials
        yourScore.innerText = newScore.score


    })
};


// viewHightScores
// displays and hides information from HTML document and displays score on scoreboard
function viewHighScores(initials) {
    document.getElementById("legends").classList.remove("hide")
    document.getElementById("stats").classList.add("hide");
    landingPage.classList.add("hide");
    questionDisplay.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, secondsLeft
        }
        scores.push(score)
    }

    var bestScore = document.getElementById("best");
    bestScore.innerHTML = "";

    // for loop runs through all potentially entered scores and places them in newly created div elements
    // class selectors are also tied to objects
    for (i = 0; i < scores.length; i++) {
        var topOne = document.createElement("div");
        topOne.setAttribute("class", "name");
        topOne.innerText = scores[i].initials;
        var nextOne = document.createElement("div");
        nextOne.setAttribute("class", "score");
        nextOne.innerText = scores[i].secondsLeft;

        bestScore.appendChild(topOne);
        bestScore.appendChild(nextOne);
    }

    // stores objects into local storage in string format in order to save data after page refresh.
    localStorage.setItem("scores", JSON.stringify(scores));

};


