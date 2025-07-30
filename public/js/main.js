// Enhanced main.js with modern effects and interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Quiz app initialized');
    
    // Initialize all enhancements
    initializeParticleSystem();
    initializeGlassEffects();
    initializeAnimations();
    initializeFormValidation();
    initializeQuizFunctionality();
    initializeAdminFeatures();
    
    // Auto-hide flash messages with enhanced animation
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        // Add entrance animation
        alert.style.transform = 'translateX(100%)';
        alert.style.opacity = '0';
        
        setTimeout(() => {
            alert.style.transform = 'translateX(0)';
            alert.style.opacity = '1';
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            alert.style.transform = 'translateX(100%)';
            alert.style.opacity = '0';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 300);
        }, 5000);
    });
});

// Particle system for background effects
function initializeParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatUp ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 20000);
    }
    
    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Enhanced glass morphism effects
function initializeGlassEffects() {
    // Add mouse move effect for glassmorphism elements
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Apply subtle movement to glass elements
        const glassElements = document.querySelectorAll('.main-container, .feature, .quiz-question');
        glassElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            const xMove = (x - 0.5) * speed * 10;
            const yMove = (y - 0.5) * speed * 10;
            
            element.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
    
    // Add tilt effect on hover
    const tiltElements = document.querySelectorAll('.feature, .quiz-question, .btn');
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Advanced animations and interactions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Special animation for features
                    if (entry.target.classList.contains('feature')) {
                        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                        entry.target.classList.add('fade-in-up');
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        // Observe elements for animation
        document.querySelectorAll('.feature, .quiz-question, .dashboard-section').forEach((el, index) => {
            el.dataset.delay = index * 200;
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.9)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    };
    
    observeElements();
    
    // Add CSS for fade-in animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(animationStyle);
}

// Enhanced form validation with visual feedback
function initializeFormValidation() {
    // Quiz generation form (Admin Dashboard)
    const quizTextarea = document.querySelector('textarea[name="text"]');
    if (quizTextarea) {
        const submitBtn = quizTextarea.closest('form')?.querySelector('button[type="submit"]');
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            position: absolute;
            bottom: 10px;
            right: 15px;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 8px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
        `;
        
        quizTextarea.style.position = 'relative';
        quizTextarea.parentNode.style.position = 'relative';
        quizTextarea.parentNode.appendChild(charCounter);
        
        function updateGenerateButton() {
            if (!submitBtn) return;
            
            const textLength = quizTextarea.value.trim().length;
            charCounter.textContent = `${textLength}/20`;
            
            if (textLength < 20) {
                submitBtn.disabled = true;
                submitBtn.textContent = `Need ${20 - textLength} more characters`;
                submitBtn.classList.add('btn-disabled');
                charCounter.style.color = '#fca5a5';
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = '✨ Generate Quiz';
                submitBtn.classList.remove('btn-disabled');
                charCounter.style.color = '#86efac';
            }
        }
        
        quizTextarea.addEventListener('input', updateGenerateButton);
        updateGenerateButton();
        
        // Enhanced form submission with loading animation
        const form = quizTextarea.closest('form');
        if (form) {
            form.addEventListener('submit', function() {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `
                        <span class="loading-spinner"></span>
                        🤖 Generating quiz...
                    `;
                    
                    // Add loading spinner styles
                    const spinnerStyle = document.createElement('style');
                    spinnerStyle.textContent = `
                        .loading-spinner {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 1s ease-in-out infinite;
                            margin-right: 8px;
                        }
                    `;
                    document.head.appendChild(spinnerStyle);
                }
            });
        }
    }
}

// Enhanced quiz functionality
function initializeQuizFunctionality() {
    const quizForm = document.querySelector('form[action="/quiz/submit"]');
    if (quizForm) {
        const nameInput = quizForm.querySelector('input[name="name"]');
        const surnameInput = quizForm.querySelector('input[name="surname"]');
        const submitBtn = quizForm.querySelector('button[type="submit"]');
        
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-info">
                <span id="progress-text">Complete all questions to submit</span>
                <span id="progress-percent">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
        `;
        
        const progressStyle = document.createElement('style');
        progressStyle.textContent = `
            .progress-container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(15px);
                border-radius: 15px;
                padding: 1.5rem;
                margin: 2rem 0;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .progress-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
                color: white;
                font-weight: 500;
            }
            
            .progress-bar {
                width: 100%;
                height: 12px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                overflow: hidden;
                position: relative;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #34d399);
                border-radius: 6px;
                width: 0%;
                transition: width 0.3s ease;
                position: relative;
            }
            
            .progress-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s ease-in-out infinite;
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(progressStyle);
        
        // Insert progress container before submit button
        if (submitBtn) {
            submitBtn.parentNode.insertBefore(progressContainer, submitBtn);
        }
        
        // Enhanced validation with real-time feedback
        function validateForm() {
            if (!nameInput || !surnameInput || !submitBtn) return;
            
            const name = nameInput.value.trim();
            const surname = surnameInput.value.trim();
            const radioButtons = quizForm.querySelectorAll('input[type="radio"]:checked');
            const totalQuestions = quizForm.querySelectorAll('.quiz-question').length;
            
            const isValid = name && surname && radioButtons.length === totalQuestions;
            const percentage = totalQuestions > 0 ? (radioButtons.length / totalQuestions) * 100 : 0;
            
            submitBtn.disabled = !isValid;
            
            // Update progress indicator
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            const progressPercent = document.getElementById('progress-percent');
            
            if (progressFill && progressText && progressPercent) {
                progressFill.style.width = percentage + '%';
                progressPercent.textContent = Math.round(percentage) + '%';
                
                if (radioButtons.length === 0) {
                    progressText.textContent = 'Complete all questions to submit';
                    progressText.style.color = '#fca5a5';
                } else if (radioButtons.length === totalQuestions) {
                    progressText.textContent = '🎉 All questions completed! Ready to submit.';
                    progressText.style.color = '#86efac';
                    submitBtn.classList.add('pulse');
                } else {
                    progressText.textContent = `${radioButtons.length}/${totalQuestions} questions completed`;
                    progressText.style.color = '#fbbf24';
                    submitBtn.classList.remove('pulse');
                }
            }
            
            // Visual feedback for form fields
            [nameInput, surnameInput].forEach(input => {
                if (input) {
                    if (input.value.trim()) {
                        input.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                        input.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
                    } else {
                        input.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                        input.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.2)';
                    }
                }
            });
        }
        
        // Add event listeners with enhanced effects
        if (nameInput) {
            nameInput.addEventListener('input', validateForm);
            nameInput.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            nameInput.addEventListener('blur', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        if (surnameInput) {
            surnameInput.addEventListener('input', validateForm);
            surnameInput.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            surnameInput.addEventListener('blur', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Enhanced radio button interactions
        quizForm.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                validateForm();
                
                // Add ripple effect to selected option
                const label = this.closest('.option-label');
                if (label) {
                    label.classList.add('selected-ripple');
                    setTimeout(() => {
                        label.classList.remove('selected-ripple');
                    }, 600);
                }
                
                // Auto-scroll to next question with smooth animation
                const currentQuestion = this.closest('.quiz-question');
                const allQuestions = Array.from(quizForm.querySelectorAll('.quiz-question'));
                const currentIndex = allQuestions.indexOf(currentQuestion);
                const nextQuestion = allQuestions[currentIndex + 1];
                
                if (nextQuestion) {
                    setTimeout(() => {
                        nextQuestion.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center',
                            inline: 'nearest'
                        });
                        
                        // Highlight next question
                        nextQuestion.style.border = '2px solid rgba(102, 126, 234, 0.6)';
                        nextQuestion.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.3)';
                        
                        setTimeout(() => {
                            nextQuestion.style.border = '';
                            nextQuestion.style.boxShadow = '';
                        }, 2000);
                    }, 300);
                }
            });
        });
        
        // Enhanced form submission with loading states
        quizForm.addEventListener('submit', function(e) {
            const name = nameInput?.value.trim();
            const surname = surnameInput?.value.trim();
            
            if (!name || !surname) {
                e.preventDefault();
                showNotification('Please enter both first name and last name', 'error');
                (nameInput || surnameInput).focus();
                return;
            }
            
            const checkedAnswers = this.querySelectorAll('input[type="radio"]:checked');
            const totalQuestions = this.querySelectorAll('.quiz-question').length;
            
            if (checkedAnswers.length !== totalQuestions) {
                e.preventDefault();
                showNotification(`Please answer all ${totalQuestions} questions before submitting`, 'warning');
                
                // Scroll to first unanswered question with highlight
                const questions = this.querySelectorAll('.quiz-question');
                for (let i = 0; i < questions.length; i++) {
                    const questionRadios = questions[i].querySelectorAll('input[type="radio"]');
                    const isAnswered = Array.from(questionRadios).some(radio => radio.checked);
                    if (!isAnswered) {
                        questions[i].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        
                        // Shake animation for unanswered question
                        questions[i].style.animation = 'shake 0.5s ease-in-out';
                        setTimeout(() => {
                            questions[i].style.animation = '';
                        }, 500);
                        break;
                    }
                }
                return;
            }
            
            // Show enhanced loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="loading-spinner"></span>
                    ⏳ Submitting Quiz...
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
                
                // Add submission progress animation
                const submitProgress = document.createElement('div');
                submitProgress.className = 'submit-progress';
                submitProgress.innerHTML = `
                    <div class="submit-progress-bar">
                        <div class="submit-progress-fill"></div>
                    </div>
                    <div class="submit-status">Processing your answers...</div>
                `;
                
                submitBtn.parentNode.appendChild(submitProgress);
                
                // Simulate progress
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress > 90) {
                        progress = 90;
                        clearInterval(progressInterval);
                    }
                    document.querySelector('.submit-progress-fill').style.width = progress + '%';
                }, 200);
            }
        });
        
        // Initial validation
        validateForm();
    }
}

// Enhanced admin features
function initializeAdminFeatures() {
    // Login form enhancements
    const loginForm = document.querySelector('form[action="/admin/login"]');
    if (loginForm) {
        const usernameInput = loginForm.querySelector('input[name="username"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        // Add floating labels effect
        [usernameInput, passwordInput].forEach(input => {
            if (input) {
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.transition = 'all 0.3s ease';
                    
                    input.addEventListener('focus', () => {
                        label.style.transform = 'translateY(-25px) scale(0.9)';
                        label.style.color = 'rgba(255, 255, 255, 1)';
                    });
                    
                    input.addEventListener('blur', () => {
                        if (!input.value) {
                            label.style.transform = 'translateY(0) scale(1)';
                            label.style.color = 'rgba(255, 255, 255, 0.7)';
                        }
                    });
                }
                
                // Enter key submission
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (submitBtn) submitBtn.click();
                    }
                });
            }
        });
        
        // Enhanced loading state on submission
        loginForm.addEventListener('submit', function() {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="loading-spinner"></span>
                    🔄 Logging in...
                `;
            }
        });
    }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Enhanced notification styles
    const notificationId = 'notification-' + Date.now();
    notification.id = notificationId;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification('${notificationId}')">×</button>
        </div>
        <div class="notification-progress">
            <div class="notification-progress-bar"></div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 500px;
        background: ${getNotificationBackground(type)};
        backdrop-filter: blur(20px);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 1px solid ${getNotificationBorder(type)};
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 10);
    
    // Auto-hide with progress bar animation
    const progressBar = notification.querySelector('.notification-progress-bar');
    if (progressBar) {
        progressBar.style.cssText = `
            height: 3px;
            background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
            width: 100%;
            transform-origin: right;
            transform: scaleX(0);
            transition: transform ${duration}ms linear;
        `;
        
        setTimeout(() => {
            progressBar.style.transform = 'scaleX(1)';
        }, 100);
    }
    
    // Remove after duration
    setTimeout(() => {
        closeNotification(notificationId);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationBackground(type) {
    const backgrounds = {
        success: 'rgba(16, 185, 129, 0.2)',
        error: 'rgba(239, 68, 68, 0.2)',
        warning: 'rgba(245, 158, 11, 0.2)',
        info: 'rgba(59, 130, 246, 0.2)'
    };
    return backgrounds[type] || backgrounds.info;
}

function getNotificationBorder(type) {
    const borders = {
        success: 'rgba(16, 185, 129, 0.4)',
        error: 'rgba(239, 68, 68, 0.4)',
        warning: 'rgba(245, 158, 11, 0.4)',
        info: 'rgba(59, 130, 246, 0.4)'
    };
    return borders[type] || borders.info;
}

function closeNotification(notificationId) {
    const notification = document.getElementById(notificationId);
    if (notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
}

// Add enhanced notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        color: white;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        margin-right: 0.75rem;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 0.75rem;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }
    
    .notification-progress {
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }
    
    .selected-ripple {
        position: relative;
        overflow: hidden;
    }
    
    .selected-ripple::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out;
    }
    
    @keyframes ripple-expand {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .submit-progress {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        backdrop-filter: blur(10px);
    }
    
    .submit-progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .submit-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #34d399);
        width: 0%;
        transition: width 0.3s ease;
        border-radius: 4px;
    }
    
    .submit-status {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        text-align: center;
    }
`;
document.head.appendChild(notificationStyle);

// Enhanced keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit forms
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeForm = document.activeElement.closest('form');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('button[type="submit"]:not(:disabled)');
            if (submitBtn) {
                submitBtn.click();
                showNotification('Form submitted via keyboard shortcut!', 'info', 2000);
            }
        }
    }
    
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            closeNotification(notification.id);
        });
    }
    
    // Arrow keys for quiz navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const questions = document.querySelectorAll('.quiz-question');
        if (questions.length > 0) {
            const currentQuestion = document.querySelector('.quiz-question:hover') || questions[0];
            const currentIndex = Array.from(questions).indexOf(currentQuestion);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % questions.length;
            } else {
                nextIndex = (currentIndex - 1 + questions.length) % questions.length;
            }
            
            questions[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            e.preventDefault();
        }
    }
});

// Results table functionality with enhanced features
function toggleDetails(index) {
    const detailsRow = document.getElementById(`details-${index}`);
    const btn = document.getElementById(`btn-${index}`);
    
    if (!detailsRow || !btn) return;
    
    const isVisible = detailsRow.style.display === 'table-row';
    
    if (!isVisible) {
        detailsRow.style.display = 'table-row';
        detailsRow.style.opacity = '0';
        detailsRow.style.transform = 'scaleY(0)';
        
        setTimeout(() => {
            detailsRow.style.opacity = '1';
            detailsRow.style.transform = 'scaleY(1)';
        }, 10);
        
        btn.textContent = '🙈 Hide Details';
        btn.classList.add('active');
    } else {
        detailsRow.style.opacity = '0';
        detailsRow.style.transform = 'scaleY(0)';
        
        setTimeout(() => {
            detailsRow.style.display = 'none';
        }, 300);
        
        btn.textContent = '🔍 Details';
        btn.classList.remove('active');
    }
}

function toggleAllDetails() {
    const rows = document.querySelectorAll('.details-row');
    const toggleBtn = document.getElementById('toggle-all-btn');
    const detailBtns = document.querySelectorAll('.details-btn');
    
    if (!toggleBtn) return;
    
    const showAll = toggleBtn.textContent.includes('Show');
    
    rows.forEach((row, index) => {
        setTimeout(() => {
            if (showAll) {
                row.style.display = 'table-row';
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'scaleY(1)';
                }, 10);
            } else {
                row.style.opacity = '0';
                row.style.transform = 'scaleY(0)';
                setTimeout(() => {
                    row.style.display = 'none';
                }, 300);
            }
        }, index * 100);
    });
    
    detailBtns.forEach(btn => {
        btn.textContent = showAll ? '🙈 Hide Details' : '🔍 Details';
        btn.classList.toggle('active', showAll);
    });
    
    toggleBtn.textContent = showAll ? '🙈 Hide All Details' : '👁️ Show All Details';
}

function filterResults(value) {
    const rows = document.querySelectorAll('.result-row');
    const detailRows = document.querySelectorAll('.details-row');
    
    rows.forEach((row, index) => {
        const percentage = parseFloat(row.dataset.percentage);
        let show = true;
        
        switch(value) {
            case 'excellent':
                show = percentage >= 70;
                break;
            case 'good':
                show = percentage >= 50 && percentage < 70;
                break;
            case 'poor':
                show = percentage < 50;
                break;
            case 'all':
            default:
                show = true;
                break;
        }
        
        // Animate visibility
        if (show) {
            row.style.display = '';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        } else {
            row.style.opacity = '0';
            row.style.transform = 'translateX(20px)';
            setTimeout(() => {
                row.style.display = 'none';
            }, 300);
        }
        
        if (detailRows[index]) {
            if (!show) {
                detailRows[index].style.display = 'none';
            }
        }
    });
    
    // Show filter feedback
    const visibleCount = Array.from(rows).filter(row => row.style.display !== 'none').length;
    showNotification(`Showing ${visibleCount} result(s)`, 'info', 2000);
}

function exportResults() {
    try {
        showNotification('Preparing export...', 'info', 1000);
        
        const visibleRows = Array.from(document.querySelectorAll('.result-row'))
            .filter(row => row.style.display !== 'none');
        
        if (visibleRows.length === 0) {
            showNotification('No results to export', 'warning');
            return;
        }
        
        let csv = 'Name,Surname,Score,Total,Percentage,Date\n';
        
        visibleRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 6) {
                const name = cells[1].textContent.trim();
                const surname = cells[2].textContent.trim();
                const score = cells[3].textContent.trim();
                const percentage = cells[4].textContent.trim();
                const date = cells[5].textContent.trim();
                
                csv += `"${name}","${surname}","${score}","${percentage}","${date}"\n`;
            }
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `quiz_results_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification(`Successfully exported ${visibleRows.length} results!`, 'success');
        } else {
            throw new Error('Export not supported in this browser');
        }
    } catch (error) {
        console.error('Export failed:', error);
        showNotification('Failed to export results', 'error');
    }
}

// Performance monitoring and optimization
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
                console.log(`🚀 Page loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Slow page load detected. Consider optimizations.');
                }
            }
        }, 0);
    });
}