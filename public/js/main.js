// ====== public/js/main.js ======

// Enhanced form validation and user experience
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz app initialized');
    
    // Auto-hide flash messages
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 300);
        }, 5000);
    });
    
    // Quiz generation form validation (Admin Dashboard)
    const quizTextarea = document.querySelector('textarea[name="text"]');
    if (quizTextarea) {
        const submitBtn = quizTextarea.closest('form')?.querySelector('button[type="submit"]');
        
        function updateGenerateButton() {
            if (!submitBtn) return;
            
            const textLength = quizTextarea.value.trim().length;
            if (textLength < 20) {
                submitBtn.disabled = true;
                submitBtn.textContent = `Need ${20 - textLength} more characters`;
                submitBtn.classList.add('btn-disabled');
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = '✨ Generate Quiz';
                submitBtn.classList.remove('btn-disabled');
            }
        }
        
        quizTextarea.addEventListener('input', updateGenerateButton);
        updateGenerateButton(); // Initial check
        
        // Form submission loading state
        const form = quizTextarea.closest('form');
        if (form) {
            form.addEventListener('submit', function() {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = '🤖 Generating quiz...';
                }
            });
        }
    }
    
    // Quiz taking form validation
    const quizForm = document.querySelector('form[action="/quiz/submit"]');
    if (quizForm) {
        const nameInput = quizForm.querySelector('input[name="name"]');
        const surnameInput = quizForm.querySelector('input[name="surname"]');
        const submitBtn = quizForm.querySelector('button[type="submit"]');
        
        // Real-time validation
        function validateForm() {
            if (!nameInput || !surnameInput || !submitBtn) return;
            
            const name = nameInput.value.trim();
            const surname = surnameInput.value.trim();
            const radioButtons = quizForm.querySelectorAll('input[type="radio"]:checked');
            const totalQuestions = quizForm.querySelectorAll('.quiz-question').length;
            
            const isValid = name && surname && radioButtons.length === totalQuestions;
            submitBtn.disabled = !isValid;
            
            // Update progress if progress elements exist
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (progressFill && progressText) {
                const percentage = (radioButtons.length / totalQuestions) * 100;
                progressFill.style.width = percentage + '%';
                
                if (radioButtons.length === 0) {
                    progressText.textContent = 'Complete all questions to submit';
                } else if (radioButtons.length === totalQuestions) {
                    progressText.textContent = '🎉 All questions completed! Ready to submit.';
                } else {
                    progressText.textContent = `${radioButtons.length}/${totalQuestions} questions completed`;
                }
            }
        }
        
        // Add event listeners
        if (nameInput) nameInput.addEventListener('input', validateForm);
        if (surnameInput) surnameInput.addEventListener('input', validateForm);
        
        quizForm.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                validateForm();
                
                // Auto-scroll to next question
                const currentQuestion = this.closest('.quiz-question');
                const allQuestions = Array.from(quizForm.querySelectorAll('.quiz-question'));
                const currentIndex = allQuestions.indexOf(currentQuestion);
                const nextQuestion = allQuestions[currentIndex + 1];
                
                if (nextQuestion) {
                    setTimeout(() => {
                        nextQuestion.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'nearest'
                        });
                    }, 300);
                }
            });
        });
        
        // Form submission
        quizForm.addEventListener('submit', function(e) {
            const name = nameInput?.value.trim();
            const surname = surnameInput?.value.trim();
            
            if (!name || !surname) {
                e.preventDefault();
                alert('Please enter both first name and last name');
                (nameInput || surnameInput).focus();
                return;
            }
            
            const checkedAnswers = this.querySelectorAll('input[type="radio"]:checked');
            const totalQuestions = this.querySelectorAll('.quiz-question').length;
            
            if (checkedAnswers.length !== totalQuestions) {
                e.preventDefault();
                alert(`Please answer all ${totalQuestions} questions before submitting`);
                
                // Scroll to first unanswered question
                const questions = this.querySelectorAll('.quiz-question');
                for (let i = 0; i < questions.length; i++) {
                    const questionRadios = questions[i].querySelectorAll('input[type="radio"]');
                    const isAnswered = Array.from(questionRadios).some(radio => radio.checked);
                    if (!isAnswered) {
                        questions[i].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        break;
                    }
                }
                return;
            }
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⏳ Submitting Quiz...';
            }
        });
        
        // Initial validation
        validateForm();
    }
    
    // Smooth scrolling for anchor links
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
    
    // Login form enhancements
    const loginForm = document.querySelector('form[action="/admin/login"]');
    if (loginForm) {
        const usernameInput = loginForm.querySelector('input[name="username"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        // Enter key submission
        [usernameInput, passwordInput].forEach(input => {
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (submitBtn) submitBtn.click();
                    }
                });
            }
        });
        
        // Loading state on submission
        loginForm.addEventListener('submit', function() {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '🔄 Logging in...';
            }
        });
    }
});

// Results table functionality
function toggleDetails(index) {
    const detailsRow = document.getElementById(`details-${index}`);
    const btn = document.getElementById(`btn-${index}`);
    
    if (!detailsRow || !btn) return;
    
    if (detailsRow.style.display === 'none' || detailsRow.style.display === '') {
        detailsRow.style.display = 'table-row';
        btn.textContent = '🙈 Hide Details';
        btn.classList.add('active');
    } else {
        detailsRow.style.display = 'none';
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
    
    rows.forEach(row => {
        row.style.display = showAll ? 'table-row' : 'none';
    });
    
    detailBtns.forEach(btn => {
        btn.textContent = showAll ? '🙈 Hide Details' : '🔍 Details';
        if (showAll) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
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
        
        row.style.display = show ? '' : 'none';
        if (detailRows[index]) {
            // Keep detail row state but hide if parent is hidden
            if (!show) {
                detailRows[index].style.display = 'none';
            }
        }
    });
}

function exportResults() {
    try {
        // Get visible results data
        const visibleRows = Array.from(document.querySelectorAll('.result-row'))
            .filter(row => row.style.display !== 'none');
        
        if (visibleRows.length === 0) {
            alert('No results to export');
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
        
        // Create and download file
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
        } else {
            alert('Export not supported in this browser');
        }
    } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export results');
    }
}

// Utility functions
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit forms
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeForm = document.activeElement.closest('form');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('button[type="submit"]:not(:disabled)');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    }
    
    // Escape to close modals or details
    if (e.key === 'Escape') {
        const openDetails = document.querySelectorAll('.details-row[style*="table-row"]');
        if (openDetails.length > 0) {
            openDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            // Update button texts
            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.textContent = '🔍 Details';
                btn.classList.remove('active');
            });
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }
        }, 0);
    });
}