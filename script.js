// Quiz Data
const quizData = [
    {
        question: "Em que ano o Cruzeiro foi fundado?",
        options: ["1918", "1921", "1925", "1930"],
        correct: 1
    },
    {
        question: "Qual é o apelido mais famoso do Cruzeiro?",
        options: ["Raposa", "Leão", "Águia", "Tigre"],
        correct: 0
    },
    {
        question: "Quantas vezes o Cruzeiro foi campeão da Copa Libertadores?",
        options: ["1", "2", "3", "4"],
        correct: 1
    },
    {
        question: "Qual é o estádio oficial do Cruzeiro?",
        options: ["Maracanã", "Morumbi", "Mineirão", "Arena da Baixada"],
        correct: 2
    },
    {
        question: "Em que estado fica a sede do Cruzeiro?",
        options: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"],
        correct: 2
    }
];

// Global Variables
let currentQuestion = 0;
let correctAnswers = 0;
let selectedSize = 'M';
let discountPercentage = 0;
let basePrice = 199.90;

// Quiz Functions
function startQuiz() {
    document.getElementById('quizModal').style.display = 'flex';
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('quizStep').textContent = `${currentQuestion + 1}/5`;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${((currentQuestion + 1) / 5) * 100}%`;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(button, index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, answerIndex) {
    // Remove previous selections
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark current selection
    button.classList.add('selected');
    
    // Check if correct
    if (answerIndex === quizData[currentQuestion].correct) {
        correctAnswers++;
    }
    
    // Wait and move to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showQuizResult();
        }
    }, 1000);
}

function showQuizResult() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    document.getElementById('correctAnswers').textContent = correctAnswers;
    
    // Calculate discount based on correct answers
    if (correctAnswers >= 4) {
        discountPercentage = 40;
    } else if (correctAnswers >= 3) {
        discountPercentage = 30;
    } else if (correctAnswers >= 2) {
        discountPercentage = 20;
    } else {
        discountPercentage = 10;
    }
    
    document.getElementById('discountValue').textContent = `${discountPercentage}%`;
}

function claimDiscount() {
    document.getElementById('quizModal').style.display = 'none';
    document.getElementById('customize').style.display = 'block';
    
    // Update discount in customization section
    document.getElementById('appliedDiscount').textContent = `${discountPercentage}%`;
    updatePricing();
    
    // Smooth scroll to customization
    document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
}

// Customization Functions
function selectSize(button, size) {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    selectedSize = size;
    updateSummary();
}

function updatePreview() {
    const name = document.getElementById('playerName').value.toUpperCase() || 'SEU NOME';
    const number = document.getElementById('playerNumber').value || '10';
    
    // Update small preview
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewNumber').textContent = number;
    
    // Update large preview
    document.getElementById('previewNameLarge').textContent = name;
    document.getElementById('previewNumberLarge').textContent = number;
    
    updateSummary();
}

function updatePricing() {
    const discountAmount = (basePrice * discountPercentage) / 100;
    const finalPrice = basePrice - discountAmount;
    
    document.getElementById('discountAmount').textContent = discountAmount.toFixed(2);
    document.getElementById('finalPrice').textContent = finalPrice.toFixed(2);
}

function updateSummary() {
    const name = document.getElementById('playerName').value.toUpperCase() || 'SEU NOME';
    const number = document.getElementById('playerNumber').value || '10';
    
    document.getElementById('summarySize').textContent = selectedSize;
    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryNumber').textContent = number;
    
    const discountAmount = (basePrice * discountPercentage) / 100;
    const finalPrice = basePrice - discountAmount;
    
    document.getElementById('summaryPrice').textContent = finalPrice.toFixed(2);
    document.getElementById('checkoutPrice').textContent = finalPrice.toFixed(2);
}

function showAddressForm() {
    document.getElementById('addressSection').style.display = 'block';
    document.getElementById('addressSection').scrollIntoView({ behavior: 'smooth' });
}

// Address Functions
async function searchCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('address').value = data.logradouro;
                document.getElementById('neighborhood').value = data.bairro;
                document.getElementById('city').value = data.localidade;
                document.getElementById('state').value = data.uf;
            } else {
                alert('CEP não encontrado!');
            }
        } catch (error) {
            alert('Erro ao buscar CEP. Tente novamente.');
        }
    }
}

function proceedToCheckout() {
    // Validate form
    const requiredFields = ['fullName', 'email', 'phone', 'cep', 'address', 'number'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error-red)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Prepare order data
    const orderData = {
        product: 'Camisa Oficial Cruzeiro',
        size: selectedSize,
        name: document.getElementById('playerName').value || 'SEU NOME',
        number: document.getElementById('playerNumber').value || '10',
        price: document.getElementById('finalPrice').textContent,
        discount: discountPercentage,
        customer: {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: {
                cep: document.getElementById('cep').value,
                street: document.getElementById('address').value,
                number: document.getElementById('number').value,
                complement: document.getElementById('complement').value,
                neighborhood: document.getElementById('neighborhood').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value
            }
        }
    };
    
    // Simulate checkout process
    alert('Redirecionando para o pagamento...');
    
    // Here you would typically redirect to a payment processor
    // For demo purposes, we'll show a success message
    setTimeout(() => {
        alert('Pedido realizado com sucesso! Você receberá um e-mail de confirmação.');
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updatePricing();
    
    // Add input masks
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});