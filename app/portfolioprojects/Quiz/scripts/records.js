const highScoresCollection = document.getElementById("highScoresCollection");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//displays a list of records. or was intended to do, overambitious start since it didnt get worked on.
highScoresCollection.innerHTML = 
highScores.map( score => {
    return `<li class="high-score">${score.name}-${score.score}</li>`;
})
.join("");