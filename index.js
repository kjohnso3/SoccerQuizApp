//Function below will begin the quiz and display the questions
function start() {
  $('#js_startButton').on('click',function(event) {
    showQuestion()
  })
}

//Function below shows user which question they are on and their current score
function displayStatus(){
  const html = $(`<ul class="progress">
      <li id="js-answered">Question: ${questionData.currentQuestion + 1}/${questionData.questions.length}</li>
      <li id="js-score">Score: ${questionData.score}/${questionData.questions.length}</li>
    </ul>`);
  $(".q-and-s-status").html(html);
}


//Function below shows questions
function showQuestion() {
  let question = questionData.questions[questionData.currentQuestion];
  displayStatus();
  const quizQuestion = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <section class="question">
        <div class="row question">
          <div class="column">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="column">
            <div class="js-options"> </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <button type = "submit" id="answer">Submit</button>
        </div>
      </div>
    </section>
    </form>
    <button type = "button" id="next-question"> Next </button>
    <div id="js-response"></div>
  </div>`);
$("main").html(quizQuestion);
displayChoices();
$("#next-question").hide();
}

function displayChoices() {
  let question = questionData.questions[questionData.currentQuestion];
  for(let i=0; i<question.answers.length; i++)
  {
    $('.js-options').append(`
        <div>
          <input type = "radio" name="choices" id="choice${i+1}" value= "${question.answers[i]}" tabindex ="${i+1}"> 
          <label for="choice${i+1}"> ${question.answers[i]}</label>
           <div class="q-and-s-status"></div>
        </div>
    `);
  }
  
}

 //Function will show results to user
function showResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
          <div class="row">
            <div class="column">
              <legend>Your Score is: ${questionData.score}/${questionData.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="column">
              <button class="buttons" type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
      </form>
    </div>`);
    questionData.currentQuestion = 0;
    questionData.score = 0;
  $("main").html(resultHtml);
}


function endQuestion (){
  $('body').on('click','#next-question', (event) => {
    $('#js-response').empty();
    questionData.currentQuestion === questionData.questions.length?showResults() : showQuestion();
  });
}

function displaySelected(isCorrect,currentQues) {
      let id = "#js-response";
      if(isCorrect) {
        questionData.score++; 
        $(`${id}`).append(`GOAL!<br/><img src="https://media1.giphy.com/media/l41m74ATRsVYOUI92/200.webp?cid=790b7611d762220cca6a2a02aa73f6c4d032e427710cf12c&rid=200.webp">`);
        $(`${id}`).addClass("right");
      }
      else {
        $(`${id}`).append(`<img src="https://media3.giphy.com/media/THlVNCPLsYc0QgtV5Y/giphy.webp?cid=790b7611eda57133b4186570c16df418839bdf7122dd3554&rid=giphy.webp" width="175px"> </br> Incorrect, yellow card!<br/> The answer is "${currentQues.correctAnswer}"<br/>`);
        $(`${id}`).addClass("wrong");
      }
  $('#next-question').show();
}

//Function below checks the answers selected by user with the correct answer in our code and will display if answer is correct or incorrect. Showing a different response for each
function answerCheck() {
  $('body').on("submit",'#js-questions', function(event) {
      event.preventDefault();
      let currentQues = questionData.questions[questionData.currentQuestion];
      let selectedOption = $("input:checked").val();
      if (!selectedOption) {
        alert("select an answer");
        return;
      } 
      let id_num = currentQues.answers.findIndex(i => i === selectedOption);
      
      $('#js-questions').hide();

      displaySelected(selectedOption === currentQues.correctAnswer, currentQues)
      questionData.currentQuestion++;
      $("#js-score").text(`Score: ${questionData.score}/${questionData.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
  });
}


// Once at the end, this function will prompt to restart the quiz 
 function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    showQuestion();
  });
 }

function handleQuizApp() {
  start();
  endQuestion();
  answerCheck();
  restartQuiz();
}

$(handleQuizApp);
