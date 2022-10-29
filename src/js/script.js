/**
 * ? Variables
 * ? 1. Global (API URL)
 * ? 2. Elements
 * ? 3. Initial Values
 */
const triviaAPIURL = "https://the-trivia-api.com/api/questions?categories=science&limit=1&difficulty=easy"

const questionEl = document.querySelector(".question")
const radioEl = document.querySelectorAll(".radio")
const answerA = document.querySelector(".answer_a")
const answerB = document.querySelector(".answer_b")
const answerC = document.querySelector(".answer_c")
const answerD = document.querySelector(".answer_d")
const submitBtnEl = document.querySelector(".submit-btn")

let currentQuiz = 0;
let currentScore = 0;

fetchQuestion()

/**
 * ? Function
 * ? 1. Fetching data from the API: The Trivia API.
 */
function fetchQuestion() {
  const response = fetch(triviaAPIURL)
    .then(response => response.json())
    .then((data) => dispalyQuestions(data))
}

/**
 * ? Function
 * ? 1. Displaying question from the API.
 */
function dispalyQuestions(data) {

  // ? Initializing clear radio buttons, unchecked.
  deseclectAnswers()

  const fetchData = data[currentQuiz]
  let fetchAnswers = [fetchData.correctAnswer, fetchData.incorrectAnswers[0], fetchData.incorrectAnswers[1], fetchData.incorrectAnswers[2]]

  // ? Randomizing fetched data (answers).
  fetchAnswers = fetchAnswers.sort(() => Math.random() - 0.5)

  // ? JSON-ed data of fetched question.
  const questionData = [
    {
      question: fetchData.question,
      answers: [
        fetchAnswers
      ],
      correct: fetchData.correctAnswer
    }
  ]

  const currentQuizData = questionData[currentQuiz]
  questionEl.innerText = currentQuizData.question  

  answerA.innerText = currentQuizData.answers[0][0]
  answerB.innerText = currentQuizData.answers[0][1]
  answerC.innerText = currentQuizData.answers[0][2]
  answerD.innerText = currentQuizData.answers[0][3]

  return questionData;
}

/**
 * ? Function
 * ? 1. Getting the selected answer.
 */
function getSelected() {
  let answer

  radioEl.forEach(radio => {
    if (radio.checked) {
      answer = radio.id
    }
  })
  return answer
}

/**
 * ? Function
 * ? 1. Deselecting radio buttons.
 */
function deseclectAnswers() {
  radioEl.forEach(radio => radio.checked = false)
}

submitBtnEl.addEventListener("click", () => {
  const answer = getSelected()
  const data = dispalyQuestions()
  
  if (answer) {
    if (answer === data[currentQuiz].correct) {
      currentScore++
      console.log(currentScore)
    }

    currentQuiz++
    if (currentQuiz < questionData.length) {
      dispalyQuestions()
      console.log(currentQuiz)
    }
  }
})
