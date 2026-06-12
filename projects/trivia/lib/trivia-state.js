const triviaState = {
  currentQuestion: 0,
  questionsRight: [],
  questionsWrong: [],
};

const questions = [
  {
    question:
      "How many Deloreans were used for the filming of the Back to the Future trilogy?",
    answer: "5",
    sources: [
      "https://en.wikipedia.org/wiki/DeLorean_time_machine#Cars_used_in_filming",
      "https://supercarblondie.com/the-deloreans-used-in-back-to-the-future-had-a-strange-life-after-the-film/",
    ],
    answerDetails:
      'There were 3 main cars used for filming. The "A" car used for all the close up shots, The "B" car which had less detail and was used for driving scenes (this is also the car that was destroyed at the end of part 3), and the "C" car which is actually a cut-away because a film camera wouldn\'t fit inside a full Delorean for the front-on interior shots. Additionally there were 2 extra cars specially configured for the off-road and train sequences that made up much of part 3.',
    options: ["1", "12", "3", "5"],
  },
  {
    question:
      "What was the original name of the Confederate iron-clad that fought the USS Monitor during the American Civil War?",
    answer: "Merrimack",
    sources: [
      "https://en.wikipedia.org/wiki/Ironclad_warship#First_battles_between_ironclads:_the_U.S._Civil_War",
    ],
    answerDetails:
      "The USS Merrimack was mothballed at Norfolk Navy Yard when Virginia seceeded and was scuttled to prevent capture. The Confederacy was able to raise the ship and rebuilt her as the iron-clad CSS Virginia.",
    options: ["Virginia", "Manassas", "Merrimack", "Montauk"],
  },
  {
    question:
      "Which FIFA tournament in 1994 had a match where one team tried to score in either goal while the other defended both goals?",
    answer: "Carribean Cup",
    sources: ["https://en.wikipedia.org/wiki/Barbados_4%E2%80%932_Grenada"],
    options: [
      "Carribean Cup",
      "World Cup",
      "European Championship",
      "Toyota Cup",
    ],
    answerDetails:
      'In a qualifying match for the 1994 Carribean Cup, Barbados had to win against Grenada by 2 points in order to advance. They were leading 2-0 until Grenada socred in the 83rd minute. Due to the tournament using a variant of the "golden goal" rule where a goal scored in overtime was worth 2 points, Barbados responded by intentionally scoring in their own net to attempt to force overtime. This resulted in Grenada trying to score in either goal, and Barbados trying to defend both goals. Barbados succeeded in went on to win in overtime.',
  },
];

//set these element refs once at start rather than every time they are needed
let questionElement,
  questionHeader,
  selectionElement,
  explanationElement,
  sourcesElement,
  submitButton,
  nextButton,
  menuContainer,
  triviaContainer,
  resultsPanel,
  resultsElement,
  resultsButton,
  resetButton,
  timerPanel;
function setElements() {
  questionElement = document.getElementById("trivia-question");
  questionHeader = document.getElementById("question-header");
  selectionElement = document.getElementById("question-options");
  explanationElement = document.getElementById("answer-explaination");
  sourcesElement = document.getElementById("answer-sources");
  timerPanel = document.getElementById("timer-panel");
  submitButton = document.getElementById("submit-button");
  nextButton = document.getElementById("next-button");
  menuContainer = document.getElementById("menu-container");
  triviaContainer = document.getElementById("trivia-container");
  resultsPanel = document.getElementById("results-container");
  resultsElement = document.getElementById("results");
  resultsButton = document.getElementById("results-button");
  resetButton = document.getElementById("reset-button");
  //explicitly reset triviaState to prevent page caching button states
  resetTriviaState(triviaState);
}

//main function to handle progression
function updateTriviaState(triviaState, action) {
  switch (action) {
    case "next":
      if (triviaState.currentQuestion >= questions.length) {
        updateTriviaState(triviaState, "complete");
        return;
      }
      setQuestion(questions[triviaState.currentQuestion], triviaState);
      break;
    case "start":
      if (!menuContainer.classList.contains("hidden")) {
        resetTriviaState(triviaState);
        menuContainer.classList.add("hidden");
        triviaContainer.classList.remove("hidden");
      }
      setQuestion(questions[triviaState.currentQuestion], triviaState);
      break;
    case "complete":
      if (!menuContainer.classList.contains("hidden")) {
        menuContainer.classList.add("hidden");
      }
      resultsButton.disabled = false;
      resetButton.disabled = false;
      triviaContainer.classList.add("hidden");
      resultsPanel.classList.remove("hidden");
      resultsElement.innerHTML = `
      <p>You got ${triviaState.questionsRight.length}/${questions.length} correct.</p>
      ${getResultsList(triviaState)}
      `;
      break;
    case "return":
      resultsPanel.classList.add("hidden");
      results.innerHTML = "";
      menuContainer.classList.remove("hidden");
      break;
    case "reset":
      resetTriviaState(triviaState);
      break;
    default:
      console.error(`Unknown action ${action}`);
      break;
  }
}

//set element vars once page loads
setElements();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    triviaState,
    questions,
    setElements,
    updateTriviaState,
  };
} else {
  globalThis.triviaState = triviaState;
  globalThis.questions = questions;
  globalThis.setElements = setElements;
  globalThis.updateTriviaState = updateTriviaState;
}
