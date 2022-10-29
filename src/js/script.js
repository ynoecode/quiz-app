/**
 * ? Variables
 * ? 1. Global (API URL)
 * ? 2. Elements
 */
const triviaAPIURL = "https://the-trivia-api.com/api/questions?categories=science&limit=1&difficulty=easy"

const questionEl = document.querySelector(".question")
const answerEl1 = document.querySelector(".answer1")
const answerEl2 = document.querySelector(".answer2")
const answerEl3 = document.querySelector(".answer3")
const answerEl4 = document.querySelector(".answer4")

const randomAnswerEl = [answerEl1, answerEl2, answerEl3, answerEl4]
const randomAnswerSlot = Math.floor(Math.random(randomAnswerEl) * 4)

console.log(randomAnswerSlot)

/**
 * ? Functions
 * ? 1. Fetching data from the API: The Trivia API
 */


async function fetchQuestion() {
  const response = await fetch(triviaAPIURL)
    .then(response => response.json())
    .then((data) => dispalyQuestions(data))
}

async function dispalyQuestions(data) {
  
  const question = data[0].question
  const correctAnswer = data[0].correctAnswer
  const incorrectAnswer = data[0].incorrectAnswer
  
  questionEl.innerText = question
  answerEl1.innerText = correctAnswer
}

fetchQuestion()