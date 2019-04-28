// var tag = document.createElement('script');
// tag.src = "https://code.jquery.com/jquery-3.3.1.js";

// var data = JSON.parse(output);
// console.log(data);

$.get('output.json').done(function (myQuestions) {
  const quizContainer = document.getElementById("quiz");
  const feedbackContainer = document.getElementById("feedback");
  const allQuestions = Object.entries(myQuestions);
  buildQuiz(allQuestions);


  // display quiz right away


  const checkButton = document.getElementById("check");
  const retakeButton = document.getElementById("retake");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  // console.log("slides", slides);
  let currentSlide = 0;
  let currentQuestion = 0;
  showSlide(0, slides);
  // console.log(myQuestions);

  // console.log(allQuestions);

  function buildQuiz(allQuestions) {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    allQuestions.forEach((currentQuestion, questionNumber) => {
      // console.log(allQuestions);
      // we'll want to store the list of option choices
      const options = [];

      // const optionItems = (currentQuestion[1].a, currentQuestion[1].b, currentQuestion[1].c, currentQuestion[1].d);
      const optionItems = {
        a: currentQuestion[1].a || currentQuestion[1].A,
        b: currentQuestion[1].b || currentQuestion[1].B,
        c: currentQuestion[1].c || currentQuestion[1].C,
        d: currentQuestion[1].d || currentQuestion[1].D
      };
      // console.log(optionItems);

      // and for each available option...
      for (letter in optionItems) {
        
        // ...add an HTML radio button
        if (currentQuestion[1].correct.length === 1) {
          options.push(
            `<label>
                       <input type="radio" id="${currentQuestion[1].id}${letter}" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${optionItems[letter]}
                     </label>`
          );
        } else {
          options.push(
            `<label>
                       <input type="checkbox" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion[1].letter}
                     </label>`
          );
        }
      }

      // add this question and its options to the output
      output.push(
        `<div class="slide">
                    <div class="question"> ${currentQuestion[1].question}</div>
                    <div class="options"> ${options.join("")}</div>
                    <div class="feedback question${questionNumber}"> ${currentQuestion[1].feedback} </div>
                 </div>`
      );

      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");

    });
  }


  // check answer
  function checkAnswer() {
    // get corresponding feedback
    // var feedback = myQuestions[currentQuestion].feedback;
    // console.log(currentQuestion);
    let tmp_feedback = '';

    const answerContainer = quizContainer.querySelectorAll(".options")[currentQuestion];
    const selector = `input[name=question${currentQuestion}]:checked`;
    // console.log(answerContainer);
    // console.log(selector);

    // let userAnswer = '';
    const checkedList = (answerContainer.querySelectorAll(selector) || {});
    let userAnswerList = [];
    for (let choice of checkedList) {
      userAnswerList.push(choice.value);
    }
    // const userAnswer = document.getElementById("myCheck").value;
    const userAnswer = userAnswerList.join(',');
    // if answer is correct
    if (userAnswer.toLowerCase() === allQuestions[currentQuestion].correct.toLowerCase()) {
      tmp_feedback = 'Correct.' + allQuestions[currentQuestion].feedback;
    } // if answer is incorrect
    else {
      tmp_feedback = 'Incorrect.' + allQuestions[currentQuestion].feedback;
    }

    const thisFeedback = document.querySelector(`.question${currentQuestion}`);
    thisFeedback.innerHTML = tmp_feedback;
    // console.log(thisFeedback);
    thisFeedback.style.display = "block";

    if (currentQuestion % 2 === 1) {
      retakeButton.style.display = "none";
    } else {
      retakeButton.style.display = "inline-block";
    }
  }

  // check answer


  function showSlide(n) {
    console.log(slides);
    slides[currentQuestion].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentQuestion = n;

    if (currentQuestion > 2) {
      previousButton.style.display = "inline-block";
    } else {
      previousButton.style.display = "none";
    }

    retakeButton.style.display = "none";
    checkButton.style.display = "inline-block";

    if (currentQuestion === slides.length - 1) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "inline-block";
    }
  }


  function retakeQuestion() {
    showSlide(currentQuestion + 1);
  }

  function showNextQuestion() {
    if (currentQuestion % 2 === 0) {
      showSlide(currentQuestion + 1);
    } else {
      showSlide(currentQuestion + 2);
    }
  }

  function showPreviousQuestion() {
    if (currentQuestion % 2 === 0) {
      showSlide(currentQuestion - 1);
    } else {
      showSlide(currentQuestion - 2);
    }
  }


  // on check answer, show feedback
  // submitButton.addEventListener("click", showResults);
  checkButton.addEventListener("click", checkAnswer);
  retakeButton.addEventListener("click", retakeQuestion);
  nextButton.addEventListener("click", showNextQuestion);
  previousButton.addEventListener("click", showPreviousQuestion);

}) 
