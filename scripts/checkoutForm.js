// checkoutForm.js
function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const validateField = (field) => {
        field.classList.remove('error');
        const prevMsg = field.parentNode?.querySelector('.error-msg');
        if (prevMsg) prevMsg.remove();

        let valid = true;
        if (field.required && !field.value.trim()) valid = false;
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) valid = false;
        else if (field.id === 'card-number' && !/^\d{16}$/.test(field.value.replace(/\s/g, ''))) valid = false;
        else if (field.id === 'cvv' && !/^\d{3,4}$/.test(field.value)) valid = false;
        else if (field.id === 'exp-date' && !/^\d{2}\/?\d{2}$/.test(field.value.replace(/\s/g, ''))) valid = false;

        if (!valid) {
            field.classList.add('error');
            const msg = document.createElement('span');
            msg.className = 'error-msg';
            msg.style.cssText = 'color: #e74c3c; font-size: 0.85em; display: block; margin-top: 4px;';
            msg.textContent = field.dataset.error || 'Please fill this field correctly';
            field.parentNode?.appendChild(msg);
        }
        return valid;
    };

    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) validateField(field);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;
        form.querySelectorAll('input, select').forEach(f => {
            if (!validateField(f)) allValid = false;
        });

        if (allValid && typeof CheckoutPage !== 'undefined') {
            CheckoutPage.completeOrder();
        }
    });
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckoutForm);
} else {
    initCheckoutForm();
}
