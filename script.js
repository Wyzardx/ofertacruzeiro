// Global variables
let currentStep = 'landing';

// Landing page functions
function startChallenge() {
    // Get URL parameters to preserve UTM tracking
    const params = new URLSearchParams(window.location.search);
    let targetUrl = 'quiz.html';
    
    if (params.toString()) {
        targetUrl += '?' + params.toString();
    }
    
    window.location.href = targetUrl;
}

// Smooth animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.hero-content > *');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Jersey animation
    const jersey = document.querySelector('.jersey-preview');
    if (jersey) {
        jersey.style.opacity = '0';
        jersey.style.transform = 'translateY(50px) scale(0.9)';
        jersey.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            jersey.style.opacity = '1';
            jersey.style.transform = 'translateY(0) scale(1)';
        }, 800);
    }
});

// Add hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = 'translateY(-3px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});