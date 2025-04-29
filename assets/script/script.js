//Select elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets.spans");


function getQuestions() {
    let myRequest = new XMLHttpRequest ();

    myRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           let questionsObject = JSON.parse(this.responseText);
           let questionsCount = questionsObject.length;
           console.log(questionsCount);

           //create bullets and questions count
           createBullets(questionsCount);
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