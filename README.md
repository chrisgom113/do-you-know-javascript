# do-you-know-javascript

## Description

Definitely one of the more difficult challenges, the assignment was to create a coding quiz based on Javascript content. The coding quiz is also timed, and the user is able to enter their intials to be added to a scoreboard. See user story for criteria below.

User Story:
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

Acceptance Criteria:
- GIVEN I am taking a code quiz
- WHEN I click the start button
- THEN a timer starts and I am presented with a question
- WHEN I answer a question
- THEN I am presented with another question
- WHEN I answer a question incorrectly
- THEN time is subtracted from the clock
- WHEN all questions are answered or the timer reaches 0
- THEN the game is over
- WHEN the game is over
- THEN I can save my initials and score

This project entailed building HTML, CSS, and Javascript code from scratch while also utilizing web APIs to assist with user interactivity.
Different than previous challenges, the web app relied less on saturated HTML content, so the HTML file in this repository is less populated and
he javascript coding, rather, traverses the DOM and programatically creates HTML content through embedded objects and variables that are nested within
functions. 

In terms of CSS, the challenge didn't differ too much, but more practice was done with styling types since "button" functionality relied 
both on Javascript and CSS in order to make buttons work while also making it LOOK like the button is working to the user. CSS also incorporates the
"hide" selector which sets the display to show or hide HTML content based on Javascript context. The "hide" feature was crucial in making this web app work! 

All in all, this has been the best blend of the three different languages that we have had to do as a class to date. And as mentioned earlier, probably the hardest!

## Table of Contents

N/A

## Usage

The link provided here brings the user to the landing page of the quiz where there are immediate instructions on how to proceed.

Live URL: https://chrisgom113.github.io/do-you-know-javascript/

Screenshots below depict some of the look/feel and functionality of the web app.

#1 Landing Page
![Landing Page](/assets/images/Landing-page.png)

#2 Presented with 5 multiple choice questions
![Questions](/assets/images/question-page.png)

#3 Script written to check for wrong vs. right answers
![Answers are checked](/assets/images/answer-checker.png)

#4 Final score (number of seconds left) is displayed and user has option to save score
![final score at end of quiz](/assets/images/final-score.png)

#5 User is presented with their new score and can also see previous attempts as well
![view scores](/assets/images/score-board.png)

## Credits

The following websites were integral in acting as as resource to help facilitate my understanding and implementation of the code in this challenge:

superdevresources.com
tympanus.net/Development/CreativeButtons/
w3schools.com
developer.mozilla.org

and last but not least...

google.com

Thanks!


## License

N/A

## Features

- Mobile display responsiveness
- Time counter feature
- API local storage
- button responsiveness
- in-depth layers of if/then and object array use to create an answer-checker