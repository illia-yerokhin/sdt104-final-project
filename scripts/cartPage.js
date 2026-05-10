// cartPage.js
document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');

    if (!cartTableBody) return;

    function renderCart() {
        const items = Cart.getItems();
        cartTableBody.innerHTML = '';

        if (items.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">Your cart is empty. 🐾</td></tr>';
            if (totalDisplay) totalDisplay.textContent = '$0.00';
            return;
        }

        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
          <span class="qty-display" style="margin: 0 8px;">${item.quantity}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        </td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      `;
            cartTableBody.appendChild(tr);
        });

        if (totalDisplay) totalDisplay.textContent = `$${Cart.getTotal().toFixed(2)}`;
        Cart.updateBadge();
    }

    // Event delegation for quantity buttons
    cartTableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('.qty-btn');
        if (!btn) return;

        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const items = Cart.getItems();
        const item = items.find(i => i.id === id);

        if (item) {
            const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            Cart.updateQuantity(id, newQty);
            renderCart();
        }
    });

    renderCart();
});