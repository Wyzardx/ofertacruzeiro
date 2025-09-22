// Claim prize page functionality
let selectedSize = '';

document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations
    const elements = document.querySelectorAll('.claim-container > *, .claim-content > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Jersey animation
    const jersey = document.querySelector('.jersey-preview-small');
    if (jersey) {
        jersey.style.opacity = '0';
        jersey.style.transform = 'translateY(30px) scale(0.9)';
        jersey.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            jersey.style.opacity = '1';
            jersey.style.transform = 'translateY(0) scale(1)';
        }, 800);
    }
    
    // Setup size selection
    setupSizeSelection();
    
    // Animate pricing info
    animatePricingInfo();
});

// Setup size selection functionality
function setupSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Store selected size
            selectedSize = this.dataset.size;
            
            // Enable pay button if size is selected
            const payButton = document.querySelector('.pay-shipping-button');
            if (payButton) {
                payButton.disabled = false;
                payButton.style.opacity = '1';
            }
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Initially disable pay button
    const payButton = document.querySelector('.pay-shipping-button');
    if (payButton) {
        payButton.disabled = true;
        payButton.style.opacity = '0.6';
    }
}

// Animate pricing information
function animatePricingInfo() {
    const priceElements = document.querySelectorAll('.pricing-info > *');
    priceElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
    });
}

// Handle payment button click
function payShipping() {
    if (!selectedSize) {
        alert('Por favor, selecione um tamanho antes de continuar.');
        return;
    }
    
    // Get URL parameters to preserve UTM tracking
    const params = new URLSearchParams(window.location.search);
    
    // Add selected size to parameters
    params.set('size', selectedSize);
    
    // Redirect to payment page (you can customize this URL)
    let paymentUrl = 'https://pay.pagamento-site.site/checkout/9ea16a32-34c2-4160-97bc-4120485bf1c5';
    
    if (params.toString()) {
        paymentUrl += '?' + params.toString();
    }
    
    // Show loading state
    const payButton = document.querySelector('.pay-shipping-button');
    if (payButton) {
        payButton.innerHTML = '⏳ Redirecionando...';
        payButton.disabled = true;
    }
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = paymentUrl;
    }, 1500);
}

// Add button animations
document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.querySelector('.pay-shipping-button');
    if (payButton) {
        payButton.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        payButton.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    }
});