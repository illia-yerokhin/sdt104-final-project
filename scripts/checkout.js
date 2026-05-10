const CheckoutPage = {
    init() {
        this.renderSummary();
    },

    renderSummary() {
        const table = document.querySelector('#checkout-summary tbody');
        const totalEl = document.getElementById('checkout-total');
        if (!table) return;

        const items = Cart.getItems();
        table.innerHTML = '';

        if (items.length === 0) {
            table.innerHTML = '<tr><td colspan="2" style="text-align:center; padding: 12px;">Your cart is empty</td></tr>';
            if (totalEl) totalEl.textContent = '$0.00';
            return;
        }

        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item.name} × ${item.quantity}</td><td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>`;
            table.appendChild(tr);
        });

        if (totalEl) totalEl.textContent = `$${Cart.getTotal().toFixed(2)}`;
    },

    completeOrder() {
        const date = new Date().toISOString().split('T')[0];
        const items = Cart.getItems();

        let content = `=== BREW CORNER ORDER ===\n`;
        content += `Date: ${new Date().toLocaleString()}\n\n`;
        content += `Items:\n`;
        items.forEach(i => {
            content += `- ${i.name} x${i.quantity} @ $${i.price.toFixed(2)} = $${(i.price * i.quantity).toFixed(2)}\n`;
        });
        content += `\nTotal: $${Cart.getTotal().toFixed(2)}\n`;
        content += `\nThank you for your purchase! 🐾☕`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `order-${date}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Cart.clear();
        alert('Order placed successfully! Your receipt is downloading.');
        window.location.href = 'index.html';
    }
};

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CheckoutPage.init());
} else {
    CheckoutPage.init();
}
