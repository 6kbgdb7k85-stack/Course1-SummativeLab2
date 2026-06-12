//process answer and track results in trivia state
function submitAnswer(triviaState, timedOut) {
  stopTimer();
  const questionObj = questions[triviaState.currentQuestion];
  const answer = timedOut ? "Timed Out" : selectionElement.value;
  let result;
  if (timedOut) {
    result = "Timed Out.";
  } else {
    result =
      answer === questions[triviaState.currentQuestion].answer
        ? "Correct! "
        : "Incorrect. ";
  }
  if (answer === questionObj.answer) {
    triviaState.questionsRight.push({
      number: triviaState.currentQuestion + 1,
      question: questionObj.question,
      answer,
      correctAnswer: questionObj.answer,
    });
  } else {
    triviaState.questionsWrong.push({
      number: triviaState.currentQuestion + 1,
      question: questionObj.question,
      answer,
      correctAnswer: questionObj.answer,
    });
  }
  triviaState.currentQuestion += 1;
  submitButton.disabled = true;
  nextButton.disabled = false;
  explanationElement.innerHTML = result + questionObj.answerDetails;
  sourcesElement.innerHTML = questionObj.sources.map((source) => {
    return `<a href="${source}">${source}</a><br>`;
  });
}

//set all the question related elements to the current question
function setQuestion(question,triviaState) {
  startTimer(timerPanel,triviaState);
  questionHeader.innerHTML=`Question ${triviaState.currentQuestion+1}`
  questionElement.innerHTML = question.question;
  selectionElement.innerHTML = question.options.map((option) => {
    return `<option name="${option}" value="${option}">${option}</option>`;
  });
  explanationElement.innerHTML = "";
  sourcesElement.innerHTML = "";
  submitButton.disabled = false;
  nextButton.disabled = true;
}

//compile quiz results
function getResultsList(triviaState) {
  const results = [
    ...triviaState.questionsRight,
    ...triviaState.questionsWrong,
  ];
  return results
    .sort((a, b) => a.number - b.number)
    .map((question) => {
      return `
        <p>${question.number}: ${question.question}</p>
        <p>Your answer: ${question.answer}</p>
        <p>Correct answer: ${question.correctAnswer}</p>
        `;
    });
}

function resetTriviaState(triviaState) {
  triviaState.currentQuestion = 0;
  triviaState.questionsRight = [];
  triviaState.questionsWrong = [];
  resultsButton.disabled = true;
  resetButton.disabled = true;
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    submitAnswer,
    setQuestion,
    getResultsList,
    resetTriviaState,
  };
} else {
  globalThis.submitAnswer = submitAnswer;
  globalThis.setQuestion = setQuestion;
  globalThis.getResultsList = getResultsList;
  globalThis.resetTriviaState = resetTriviaState;
}
