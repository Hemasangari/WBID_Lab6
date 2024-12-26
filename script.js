const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris",
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "12", "15"],
        answer: "8",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 30;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");

function shuffleQuestions() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = "Time's up!";
            nextButton.disabled = false;
        }
    }, 1000);
}

function displayQuestion() {
    clearInterval(timer);
    feedbackElement.textContent = "";
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(li);
    });
    startTimer();
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        feedbackElement.textContent = "Correct!";
        score++;
        scoreElement.textContent = score;
    } else {
        feedbackElement.textContent = `Incorrect! The correct answer was ${currentQuestion.answer}.`;
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        feedbackElement.textContent = "Quiz finished!";
        nextButton.disabled = true;
    }
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    nextButton.disabled = true;
    displayQuestion();
}

nextButton.addEventListener("click", () => {
    nextButton.disabled = true;
    nextQuestion();
});

startQuiz();
