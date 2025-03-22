function toggleSubjects() {
    const nav = document.getElementById('subject-nav');
    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
}

function toggleDropdown(subjectId) {
    const subjectSection = document.getElementById(subjectId);
    const allSections = document.querySelectorAll('.subject-section');

    // Close all other sections
    allSections.forEach(section => {
        if (section !== subjectSection) section.style.display = 'none';
    });

    // Toggle the selected section
    subjectSection.style.display =
        subjectSection.style.display === 'none' ? 'block' : 'none';
}

// Hide all sections initially
window.onload = () => {
    document.getElementById('subject-nav').style.display = 'none';
    const allSections = document.querySelectorAll('.subject-section');
    allSections.forEach(section => section.style.display = 'none');
};
document.addEventListener("DOMContentLoaded", function () {
    setupQuizzes();
    setupGame();
});

// Sample quiz questions
const quizData = {
    physics: [
        {
            question: "What is Newton’s First Law of Motion also known as?",
            options: ["Law of Gravity", "Law of Inertia", "Law of Acceleration"],
            answer: "Law of Inertia"
        },
        {
            question: "What is the formula for Force?",
            options: ["F = m * a", "E = mc^2", "P = W / t"],
            answer: "F = m * a"
        }
    ],
    chemistry: [
        {
            question: "What is the atomic number of Oxygen?",
            options: ["6", "8", "10"],
            answer: "8"
        },
        {
            question: "What type of bond is formed between sodium and chlorine?",
            options: ["Covalent bond", "Ionic bond", "Metallic bond"],
            answer: "Ionic bond"
        }
    ]
};

// Handle quiz button clicks
function setupQuizzes() {
    document.querySelectorAll(".quiz-button").forEach(button => {
        button.addEventListener("click", function () {
            const subject = this.parentElement.querySelector("h2").innerText.toLowerCase().replace(/[^a-z]/g, '');
            startQuiz(subject);
        });
    });
}

function startQuiz(subject) {
    const quizContainer = document.getElementById("quizModal");
    const quizContent = document.getElementById("quizOptions");
    const quizQuestion = document.getElementById("quizQuestion");

    let questions = quizData[subject] || [];
    if (questions.length === 0) {
        alert("No quiz available for this subject yet.");
        return;
    }

    let currentIndex = 0;
    let score = 0;

    function loadQuestion() {
        if (currentIndex >= questions.length) {
            alert(`Quiz Completed! Your Score: ${score}/${questions.length}`);
            quizContainer.style.display = "none";
            return;
        }

        quizQuestion.innerText = questions[currentIndex].question;
        quizContent.innerHTML = "";

        questions[currentIndex].options.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = function () {
                if (option === questions[currentIndex].answer) {
                    score++;
                    alert("Correct!");
                } else {
                    alert("Wrong answer!");
                }
                currentIndex++;
                loadQuestion();
            };
            quizContent.appendChild(btn);
        });

        quizContainer.style.display = "flex";
    }

    loadQuestion();
}

// Close quiz modal
function closeQuiz() {
    document.getElementById("quizModal").style.display = "none";
}

// ---------------- SIMPLE GAME ----------------
function setupGame() {
    const gameContainer = document.createElement("div");
    gameContainer.innerHTML = `
        <div class="game-box">
            <h3>Quick Trivia Challenge</h3>
            <p id="game-question">Click Start to Begin!</p>
            <button id="start-game">Start</button>
            <ul id="game-options"></ul>
            <p id="game-score">Score: 0</p>
        </div>
    `;
    document.body.appendChild(gameContainer);

    document.getElementById("start-game").addEventListener("click", startGame);
}

const gameQuestions = [
    { question: "What is the symbol for Gold?", options: ["G", "Au", "Ag"], answer: "Au" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus"], answer: "Mars" }
];

let gameScore = 0;
let gameIndex = 0;
let gameTimer;

function startGame() {
    document.getElementById("game-score").innerText = `Score: ${gameScore}`;
    loadGameQuestion();
}

function loadGameQuestion() {
    if (gameIndex >= gameQuestions.length) {
        alert(`Game Over! Your Score: ${gameScore}`);
        return;
    }

    document.getElementById("game-question").innerText = gameQuestions[gameIndex].question;
    const optionsContainer = document.getElementById("game-options");
    optionsContainer.innerHTML = "";

    gameQuestions[gameIndex].options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = function () {
            clearTimeout(gameTimer);
            if (option === gameQuestions[gameIndex].answer) {
                gameScore += 10;
                alert("Correct!");
            } else {
                gameScore -= 5;
                alert("Wrong answer!");
            }
            gameIndex++;
            startGame();
        };
        optionsContainer.appendChild(btn);
    });

    gameTimer = setTimeout(() => {
        alert("Time's up!");
        gameIndex++;
        startGame();
    }, 5000);
}

