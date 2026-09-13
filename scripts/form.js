document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accessible-form');
    if (!form) return;

    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('work-email');
    const passwordInput = document.getElementById('user-password');
    const formStatus = document.getElementById('form-status');

    // Validation Rules
    function validateName() {
        const errorEl = document.getElementById('name-error');
        const val = nameInput.value.trim();

        if (!val) {
            setError(nameInput, errorEl, 'Full name is required.');
            return false;
        } else if (val.length < 3) {
            setError(nameInput, errorEl, 'Name must be at least 3 characters.');
            return false;
        }
        clearError(nameInput, errorEl);
        return true;
    }

    function validateEmail() {
        const errorEl = document.getElementById('email-error');
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!val) {
            setError(emailInput, errorEl, 'Work email is required.');
            return false;
        } else if (!emailRegex.test(val)) {
            setError(emailInput, errorEl, 'Please enter a valid email address (e.g., name@domain.com).');
            return false;
        }
        clearError(emailInput, errorEl);
        return true;
    }

    function validatePassword() {
        const errorEl = document.getElementById('password-error');
        const val = passwordInput.value;
        const hasNumber = /\d/.test(val);

        if (!val) {
            setError(passwordInput, errorEl, 'Password is required.');
            return false;
        } else if (val.length < 8) {
            setError(passwordInput, errorEl, 'Password must be at least 8 characters.');
            return false;
        } else if (!hasNumber) {
            setError(passwordInput, errorEl, 'Password must contain at least 1 number.');
            return false;
        }
        clearError(passwordInput, errorEl);
        return true;
    }

    // Accessibility Error Helpers
    function setError(input, errorEl, message) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message; // Screen readers announce via aria-live="polite"
        window.announceA11yMessage && window.announceA11yMessage(`Validation Error [${input.name}]: ${message}`);
    }

    function clearError(input, errorEl) {
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
    }

    // Real-time Event Listeners
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    // Clear errors when the user starts correcting their input
    nameInput.addEventListener('input', () => {
        if (nameInput.getAttribute('aria-invalid') === 'true') validateName();
    });
    emailInput.addEventListener('input', () => {
        if (emailInput.getAttribute('aria-invalid') === 'true') validateEmail();
    });
    passwordInput.addEventListener('input', () => {
        if (passwordInput.getAttribute('aria-invalid') === 'true') validatePassword();
    });

    // Form Submission Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPasswordValid) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Registration successful! Profile credentials validated.';
            window.announceA11yMessage && window.announceA11yMessage('Form submitted successfully!');
            if (window.showToast) {
                window.showToast('Registration Complete', 'Your developer profile has been created.', 'success');
            }
            form.reset();
        } else {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Form submission failed. Please fix the highlighted errors above.';
            window.announceA11yMessage && window.announceA11yMessage('Form submission failed due to invalid fields');

            // Focus management: Shift focus to first invalid input field
            const firstInvalidField = form.querySelector('[aria-invalid="true"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
});