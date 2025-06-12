// Smooth scrolling for navigation links
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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based animations for elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);
// Trigger animation check on page load
window.addEventListener('load', animateOnScroll);

// Service modals logic
const serviceCards = document.querySelectorAll('.service-card');
const modals = [
    document.getElementById('modal-1'),
    document.getElementById('modal-2'),
    document.getElementById('modal-3'),
    document.getElementById('modal-4')
];

serviceCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        modals[idx].classList.add('active');
    });
});

modals.forEach(modal => {
    // Close on close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Mall ad calculator logic
const mallObj = {
    Cost_of_second: 0.04,
    Work_time: 15,
    Screen_amount: 2
};

function calcMallAdPrice() {
    const ad_duration = Math.max(1, Number(document.getElementById('ad_duration').value) || 0);
    const showing_ammount_per_hour = Math.max(12, Number(document.getElementById('showing_ammount_per_hour').value) || 0);
    const advertising_company_duration = Math.max(15, Number(document.getElementById('advertising_company_duration').value) || 0);

    const total_showing_ammount_per_hour = mallObj.Work_time * showing_ammount_per_hour;
    const Duration_per_period = mallObj.Screen_amount * total_showing_ammount_per_hour * advertising_company_duration;
    const Price = mallObj.Cost_of_second * ad_duration * Duration_per_period;

    document.getElementById('mall-ad-price').textContent = Price.toLocaleString('uk-UA', {maximumFractionDigits: 2});
}

const mallCalcInputs = [
    document.getElementById('ad_duration'),
    document.getElementById('showing_ammount_per_hour'),
    document.getElementById('advertising_company_duration')
];

mallCalcInputs.forEach(input => {
    input.addEventListener('input', calcMallAdPrice);
});

// Initial calculation
calcMallAdPrice(); 