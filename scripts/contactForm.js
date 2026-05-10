document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        form.querySelectorAll('[required]').forEach(field => {
            field.classList.remove('error');
            const prevMsg = field.parentNode.querySelector('.error-msg');
            if (prevMsg) prevMsg.remove();

            if (!field.value.trim() || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))) {
                isValid = false;
                field.classList.add('error');
                const msg = document.createElement('span');
                msg.className = 'error-msg';
                msg.style.cssText = 'color: #e74c3c; font-size: 0.85em; display: block; margin-top: 4px;';
                msg.textContent = field.type === 'email' ? 'Please enter a valid email' : 'This field is required';
                field.parentNode.appendChild(msg);
            }
        });

        if (isValid) {
            alert('Message sent successfully! We\'ll get back to you within 1 business day. 🐾');
            form.reset();
        }
    });
});