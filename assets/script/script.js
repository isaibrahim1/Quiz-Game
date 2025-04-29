//Select elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets.spans");
let quizArea = document.querySelector(".quiz-area");

//set options
let currentIndex = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest ();

    myRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           let questionsObject = JSON.parse(this.responseText);
           let questionsCount = questionsObject.length;
           console.log(questionsCount);

           //create bullets and questions count
           createBullets(questionsCount);

           //add question 
           addQuestionData(questionsObject[0], qCount);
        }
    };
    
    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
} 

getQuestions();


function createBullets(num) {
    countSpan.innerHTML = num;
    //create bullet 
    for (let i = 0; i < num; i++) {

        if (i === 0) {
            theBullet.className = "on"; // first span on 
        }

        let theBullet = document.createElement("span");
        
        bulletsSpanContainer.appendChild(theBullet)
    };
}


function addQuestionData(obj, count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);

    quizArea.appendChild(questionTitle);

    for  (let i = 1; i <= 4; i++) {

        let mainDiv = document.createElement("div");
        mainDiv.className = "answer";

        let radioInput = document.createElement("input");

        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

    }
}