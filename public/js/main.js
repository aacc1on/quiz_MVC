// ====== public/js/main.js ======

// Toggle details in results table
function toggleDetails(index) {
    const detailsRow = document.getElementById(`details-${index}`);
    if (detailsRow.style.display === 'none' || detailsRow.style.display === '') {
        detailsRow.style.display = 'table-row';
    } else {
        detailsRow.style.display = 'none';
    }
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Quiz generation form validation
    const quizForm = document.querySelector('.quiz-form textarea');
    if (quizForm) {
        quizForm.addEventListener('input', function() {
            const submitBtn = this.closest('form').querySelector('button[type="submit"]');
            if (this.value.length < 20) {
                submitBtn.disabled = true;
                submitBtn.textContent = `Need ${20 - this.value.length} more characters`;
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Generate Quiz';
            }
        });
    }

    // Quiz submission validation
    const quizSubmitForm = document.querySelector('form[action="/quiz/submit"]');
    if (quizSubmitForm) {
        quizSubmitForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value.trim();
            const surname = this.querySelector('input[name="surname"]').value.trim();
            
            if (!name || !surname) {
                e.preventDefault();
                alert('Please enter both first name and last name');
                return;
            }

            // Check if all questions are answered
            const questions = this.querySelectorAll('.quiz-question');
            for (let i = 0; i < questions.length; i++) {
                const questionName = `question_${i}`;
                const checked = this.querySelector(`input[name="${questionName}"]:checked`);
                if (!checked) {
                    e.preventDefault();
                    alert(`Please answer question ${i + 1}`);
                    questions[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        });
    }

    // Auto-scroll to first unanswered question
    const quizQuestions = document.querySelectorAll('.quiz-question');
    quizQuestions.forEach((question, index) => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Auto-scroll to next question if exists
                if (index + 1 < quizQuestions.length) {
                    setTimeout(() => {
                        quizQuestions[index + 1].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 300);
                }
            });
        });
    });

    // Smooth scroll for navigation
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

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});

// Loading states for buttons
function showLoading(button, text = 'Loading...') {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = text;
}

function hideLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Submit';
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show temporary success message
        const msg = document.createElement('div');
        msg.textContent = 'Copied to clipboard!';
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 1000;
            font-weight: bold;
        `;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    });
}

// Print results functionality
function printResults() {
    window.print();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit forms
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeForm = document.activeElement.closest('form');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
});

