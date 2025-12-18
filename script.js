let cart = [];
let total = 0;

function changeQuantity(btn, change) {
    const span = btn.parentNode.querySelector('span');
    let qty = parseInt(span.textContent) + change;
    if (qty < 1) qty = 1;
    span.textContent = qty;
}

function addToCart(name, price, button) {
    const qtySpan = button.parentNode.querySelector('.quantity span');
    const qty = parseInt(qtySpan.textContent);
    for (let i = 0; i < qty; i++) {
        cart.push({name, price});
        total += price;
    }
    updateCart();
    // Reset quantity to 1 after adding
    qtySpan.textContent = 1;
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');
    const orderDetails = document.getElementById('order-details');
    
    cartList.innerHTML = '';
    let orderText = 'Beställning:\n\n';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} kr`;
        cartList.appendChild(li);
        orderText += `${index + 1}. ${item.name} - ${item.price} kr\n`;
    });
    orderText += `\nTotalt: ${total} kr`;
    
    totalEl.textContent = total;
    orderDetails.value = orderText;
}
