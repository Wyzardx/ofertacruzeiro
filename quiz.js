// Quiz data for Cruzeiro
const quizData = [
    {
        question: "Qual é o apelido mais conhecido do Cruzeiro?",
        options: [
            { text: "Raposa", correct: true },
            { text: "Galo", correct: false },
            { text: "Peixe", correct: false }
        ]
    },
    {
        question: "Em que ano o Cruzeiro conquistou sua primeira Libertadores?",
        options: [
            { text: "1976", correct: true },
            { text: "1997", correct: false },
            { text: "2003", correct: false }
        ]
    },
    {
        question: "Quem é considerado um dos maiores ídolos do Cruzeiro?",
        options: [
            { text: "Tostão", correct: true },
            { text: "Zico", correct: false },
            { text: "Romário", correct: false }
        ]
    },
    {
        question: "Qual é o estádio mais emblemático para a torcida do Cruzeiro?",
        options: [
            { text: "Mineirão", correct: true },
            { text: "Maracanã", correct: false },
            { text: "Allianz Parque", correct: false }
        ]
    },
    {
        question: "Quantas Libertadores o Cruzeiro já conquistou até 2023?",
        options: [
            { text: "2", correct: true },
            { text: "1", correct: false },
            { text: "3", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const progressBar = document.getElementById('progressBar');
const quizStep = document.getElementById('quizStep');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const resultMessage = document.getElementById('resultMessage');

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    updateProgress();
});

// Shuffle array function
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Load current question
function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        const shuffledOptions = shuffle(question.options);
        
        questionText.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create option buttons
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.onclick = () => selectOption(option.correct);
            optionsContainer.appendChild(button);
        });
        
        // Add entrance animation
        const options = optionsContainer.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateY(20px)';
            option.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                option.style.opacity = '1';
                option.style.transform = 'translateY(0)';
            }, index * 100);
        });
    } else {
        finishQuiz();
    }
}

// Handle option selection
function selectOption(isCorrect) {
    if (isCorrect) {
        score++;
    }
    
    // Disable all buttons
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        updateProgress();
        loadQuestion();
    }, 1000);
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    quizStep.textContent = `${currentQuestion + 1}/5`;
}

// Finish quiz and redirect
function finishQuiz() {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    // Get URL parameters to preserve UTM tracking
    const params = new URLSearchParams(window.location.search);
    
    // Add score to parameters
    params.set('score', score);
    params.set('total', quizData.length);
    
    let redirectUrl = 'parabens.html';
    if (params.toString()) {
        redirectUrl += '?' + params.toString();
    }
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 3000);
}

// Add entrance animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.quiz-header > *, .quiz-content > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});