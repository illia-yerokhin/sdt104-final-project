// CardEvents.js
document.addEventListener('DOMContentLoaded', () => {

    // Add to cart buttons ONLY
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = btn.dataset.price;

            Cart.addItem(id, name, price, 1);

            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    });

    // Buy now buttons ONLY
    const buyNowButtons = document.querySelectorAll('.add-to-cart-buy-now');

    buyNowButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = btn.dataset.price;

            // Add ONE item
            Cart.addItem(id, name, price, 1);

            // Go to cart page
            window.location.href = 'cart.html';
        });
    });

});