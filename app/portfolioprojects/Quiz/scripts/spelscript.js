const question = document.getElementById("question");
//const choices = Array.from(document.getElementsByClassName("answerChoice"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
//let availableQuestions = [];
let questions = [];
let results = "";
const formattedQuestions = [];

//Collecting data from api, sorting them into variables so that the information can be obtained and so that we can interact with it.
fetch("https://quizapi.io/api/v1/questions?apiKey=vFJzxHsr68WdNqNTG1imziUhwY3KgT90Gq7xshlG&limit=10&category=code&difficulty=easy")
.then( results => {
    return results.json();
}).then(loadedQuestions => {
    questions = loadedQuestions.map(loadedQuestion => {
        //varables to differentiate between what information we want to access.
        let index = Object.values(loadedQuestion.correct_answers).indexOf("true");
        let keyes = Object.keys(loadedQuestion.correct_answers)[index];
        //reforming the result from api and taking out the information we want to interact with.
        const formattedQuestion = {
            question: loadedQuestion.question,
            answers: loadedQuestion.answers,
            correct: loadedQuestion.correct_answers,
            correctAnswer: keyes.substring(0, 8)
        }
        console.log("B", keyes.substring(0, 8));
        console.log(formattedQuestion);
        //placing the reformed question into our array that will contain a collection of the reformed questions.
        formattedQuestions.push(formattedQuestion);
        
    })
    
    startGame();
    
})
.catch(err => {
    console.error(err);
})

const correctBonus = 10;
const max_questions = 10;

//Initiation of information that will be displayed on the page.
startGame = () => {
    questionCounter = 0;
    score = 0;
    console.log("questions", formattedQuestions);
    getNewQuestion();
};

//Allows the page to update our counters and display information on the page,
//updating the information as we validate a choice and relocating the user to endscreen after passing the last question.
getNewQuestion = () => {
    //upong completing the final question we store the score for the playthrough and relocates the user to endscreen.
    if(questions.length === 0 || questionCounter >= max_questions){
        localStorage.setItem("latestScore", score);
        return window.location.assign("/slut.html");
    }
    //Counts and displays the question that user is currently on.
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + max_questions;
    const questionIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = formattedQuestions[questionIndex];

    question.innerText = currentQuestion.question;
    
    //Declaring a variable to update our list of answers according to the question displayed.
    let answersList = document.getElementById('answersList');
    //declaring an array containing strings that we can match for checkboxes belonging to each answer.
    const answerNames = ["answer_a", "answer_b", "answer_c","answer_d", "answer_e", "answer_f"];
    let index = 0;

    //looping through the question displayed for the user and the content of answers so that we can display them,
    //and give checkboxes that we can match with corresponding answers in order to later see if the user has entered the correct answer.
    for (var ans in currentQuestion.answers) {
        if (currentQuestion.answers.hasOwnProperty(ans)) {
            console.log(ans + " -> " + currentQuestion.answers[ans]);
            if(currentQuestion.answers[ans]){
                var x = answerNames[index];
                answersList.innerHTML += '<input type="checkbox" value='+x+'>'+currentQuestion.answers[ans].replace(/</g, "&lt;").replace(/>/g, "&gt;")+'<br>';
                index ++;
            }
        }
    }

    //declaring variable for the button that will see if the user have entered a correct answer and thus load the next question.
    let submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", () =>{
        let answerCheckbox = document.querySelector('input[type="checkbox"]:checked');
        results = answerCheckbox;
        console.log(answerCheckbox);

        //Controlling if the checkbox that the user clicked matches up with the proper answer. If it does not we write out a log.
        if (results != null && (results.value == currentQuestion.correctAnswer || currentQuestion.correctAnswer == null)){
            increaseScore(correctBonus);
            answersList.innerHTML = "";
            getNewQuestion();
        } else {
            console.log("FEEEL!");
        }
    })
}

increaseScore = num => {
    score += num;
    scoreText.innerText = score;
}   

