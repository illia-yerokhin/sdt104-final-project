// Cart.js
const Cart = {
    storageKey: 'brewCornerCart',

    getItems() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    },

    saveItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        this.updateBadge();
    },

    addItem(id, name, price, quantity = 1) {
        let items = this.getItems();
        const existing = items.find(item => item.id === id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({ id, name, price: parseFloat(price), quantity });
        }
        this.saveItems(items);
    },

    updateQuantity(id, newQuantity) {
        let items = this.getItems();
        const item = items.find(i => i.id === id);

        if (item) {
            if (newQuantity <= 0) {
                items = items.filter(i => i.id !== id);
            } else {
                item.quantity = newQuantity;
            }
            this.saveItems(items);
        }
    },

    removeItem(id) {
        this.updateQuantity(id, 0);
    },

    clear() {
        localStorage.removeItem(this.storageKey);
        this.updateBadge();
    },

    getTotal() {
        return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getItemCount() {
        return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
    },

    updateBadge() {
        const badge = document.getElementById('cart-badge');
        if (badge) badge.textContent = this.getItemCount();
    },

    init() {
        this.updateBadge();
    }
};

document.addEventListener('DOMContentLoaded', () => Cart.init());
