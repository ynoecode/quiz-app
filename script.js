import { data } from "Questions.js";

/**
 * ? Variables
 * ? 1. Elements
 * ? 2. Initial Values
 */

const questionEl = document.querySelector(".question")
const radioEl = document.querySelectorAll(".radio")
const answerA = document.querySelector(".answer_a")
const answerB = document.querySelector(".answer_b")
const answerC = document.querySelector(".answer_c")
const answerD = document.querySelector(".answer_d")
const answerInA = document.querySelector(".answer_a_in")
const answerInB = document.querySelector(".answer_b_in")
const answerInC = document.querySelector(".answer_c_in")
const answerInD = document.querySelector(".answer_d_in")
const submitBtnEl = document.querySelector(".submit-btn")
const totalQuestionsEl = document.querySelector(".total-questions")
const correctAnswersEl = document.querySelector(".correct-answers")

let currentQuiz = Math.floor(Math.random() * data.length);
let currentScore = 0;

dispalyQuestions()

/**
 * ? Function
 * ? 1. Displaying question from the API.
 */
function dispalyQuestions() {

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

  questionEl.innerText = questionData[0].question

  answerA.innerText = questionData[0].answers[0][0]
  answerB.innerText = questionData[0].answers[0][1]
  answerC.innerText = questionData[0].answers[0][2]
  answerD.innerText = questionData[0].answers[0][3]

  answerInA.setAttribute("id", questionData[0].answers[0][0]);
  answerInB.setAttribute("id", questionData[0].answers[0][1]);
  answerInC.setAttribute("id", questionData[0].answers[0][2]);
  answerInD.setAttribute("id", questionData[0].answers[0][3]);


  totalQuestionsEl.innerText = data.length
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
  const selectedAnswer = getSelected()

  if (selectedAnswer === data[currentQuiz].correctAnswer) {
    currentScore++
  }
  correctAnswersEl.innerText = currentScore

  currentQuiz++

  console.log(currentQuiz + "/" + data.length)

  if (currentQuiz < data.length) {
    dispalyQuestions()
  } else {
    alert("Quiz completed!")

    currentScore = 0
  }
})
