// Congratulations page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations
    const elements = document.querySelectorAll('.congratulations-container > *, .congratulations-content > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Jersey animation
    const jersey = document.querySelector('.jersey-preview-large');
    if (jersey) {
        jersey.style.opacity = '0';
        jersey.style.transform = 'translateY(50px) scale(0.8)';
        jersey.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            jersey.style.opacity = '1';
            jersey.style.transform = 'translateY(0) scale(1)';
        }, 1000);
    }
    
    // Get score from URL parameters
    const params = new URLSearchParams(window.location.search);
    const score = params.get('score') || '5';
    const total = params.get('total') || '5';
    
    // Update congratulations message based on score
    const congratsText = document.querySelector('.congratulations-text');
    if (congratsText) {
        congratsText.innerHTML = `
            <strong>Você acertou ${score} de ${total} perguntas!</strong><br>
            Seu conhecimento sobre o Cruzeiro e sua paixão pelo clube são dignos de celebração!
        `;
    }
});

// Handle claim prize button
function claimPrize() {
    // Get URL parameters to preserve UTM tracking
    const params = new URLSearchParams(window.location.search);
    let targetUrl = 'resgatar.html';
    
    if (params.toString()) {
        targetUrl += '?' + params.toString();
    }
    
    window.location.href = targetUrl;
}

// Add button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const claimBtn = document.querySelector('.claim-button');
    if (claimBtn) {
        claimBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        claimBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});