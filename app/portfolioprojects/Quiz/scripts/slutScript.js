const userName = document.getElementById("userName");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const latestScore = localStorage.getItem("latestScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;
finalScore.innerText = latestScore;

userName.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !userName.value;
})


//event that stores score values, username and highscores of "others".
//also updates the list of highscores if there is a "new record".
//returns the user to the frontpage when choosing to save score.
saveHighScore = e => {
    console.log("clicked");
    e.preventDefault();   

    const score = {
        score: latestScore,
        name: userName.value
    }
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/Mainpage.html");
    console.log(highScores);
}