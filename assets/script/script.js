//Select elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets.spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySlelctor(".submit-button");
let resultContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


//set options
let currentIndex = 0;
letrihgtAnswers = 0;
let countdownInterval; 

function getQuestions() {
    let myRequest = new XMLHttpRequest ();

    myRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           let questionsObject = JSON.parse(this.responseText);
           let questionsCount = questionsObject.length;
          // console.log(questionsCount);

           //create bullets and questions count
           createBullets(questionsCount);

           //add question 
           addQuestionData(questionsObject[0], qCount);

             //start countdown
             countdown(5, qCount);  

           //click on submit 
           submitButton.onclick = () => {
              
            let theRightAnswer = questionsObject[currentIndex].right_answer;
            
            currentIndex++;

            checkAnswer(theRightAnswer, qCount);

            quizArea.innerHTML =""; //remove question
            answersArea.innerHTML = "";
            addQuestionData(questionsObject[currentIndex], qcount) //add question

            handleBullets(); //handel bullets

            //clear countdown and start again
            clearInterval(countdownInterval);
            countdown(5, qCount);

            showResult(qcount);
           }
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

        let theBullet = document.createElement("span");
        if (i === 0) {
            theBullet.className = "on"; // first span on 
        }

        
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



        let theLabel = document.createElement("label");
        theLabel.htmlFor = `answer_${i}`;
        let labelText = document.createTextNode(obj)[`answer_${i}`];

        theLabel.appendChild.appendChild(labelText);

        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);


    }
}


//check answer function
function checkAnswer(rAnswer, count) {
    let answers = document.detElementByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;
       // console.log("correct answer");
    }
}


function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfspans = Array.from(bulletsSpans);
    arrayOfspans.forEach((span, index) => {
        if (currentIndex === index) {
            span.calssName = "on";
        }
    })
}

//show result 
function showResult(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();

      if (rightAnswers > (count / 2) && rightAnswers < count) {
           theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count} Is Good`;
      } else if (rightAnswers === count) {
        theResults = `<span class="perfect">Perfect</span>, All Answer Is Right`;
      } else {
        theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count} Bad`;
      }
        resultContainer.innerHTML = theResults;
        resultContainer.style.padding = "10px";
        resultContainer.style.backgroundColor = "white";
        resultContainer.style.marginTop = "10px";
         }
}


//countdown function 
function countdown (duration, count) {
    if (currentIndex < count){
       let minutes, seconds;
       countdownInterval = setInterval(function() {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

          minutes = minutes < 10 ?`0${minutes}` : minutes;
          seconds = seconds < 10 ?`0${seconds}` : seconds;

        countdownElement.innerHTML = `${minutes}:${seconds}`;
         if (--duration < 0) {
            clearInterval(countdownInterval);
             submitButton.click();
         }

       }, 1000);
    }
}