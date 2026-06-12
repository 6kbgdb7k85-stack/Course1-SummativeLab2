const TIME_INIT = 5;
let timeRemainig, timerId;

function startTimer(timerElement, triviaState) {
  timeRemainig = TIME_INIT;
  timerElement.innerHTML = timeRemainig;
  timerId = setInterval(() => updateTimer(timeRemainig, timerElement, triviaState), 1000);
}

function updateTimer(secondsRemaining, timerElement, triviaState) {
  timeRemainig -= 1;
  timerElement.innerHTML = timeRemainig;
  if (timeRemainig <= 0) {
    submitAnswer(triviaState, true);
  }
}

function stopTimer() {
  clearInterval(timerId);
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    TIME_INIT,
    startTimer,
    updateTimer,
    stopTimer,
  };
} else {
  globalThis.startTimer = startTimer;
  globalThis.updateTimer = updateTimer;
  globalThis.stopTimer = stopTimer;
  globalThis.TIME_INIT = TIME_INIT;
}
