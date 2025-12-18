let cart = []; // Array of {name, price, quantity}

function changeQuantity(btn, change) {
    const span = btn.parentNode.querySelector('span');
    let qty = parseInt(span.textContent) + change;
    if (qty < 1) qty = 1;
    span.textContent = qty;
}

function addToCart(button) {
    const itemDiv = button.parentNode;
    const name = itemDiv.querySelector('h3').textContent;
    const price = parseInt(itemDiv.querySelector('.price').textContent);
    const qtySpan = itemDiv.querySelector('.quantity span');
    const qty = parseInt(qtySpan.textContent);

    // Check if item already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({name, price, quantity: qty});
    }

    qtySpan.textContent = 1; // reset
    updateCart();
}

function removeFromCart(name, amount = 1) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity -= amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');
    const orderDetails = document.getElementById('order-details');

    cartList.innerHTML = '';
    let total = 0;
    let orderText = 'Beställning:\n\n';

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span><strong>${item.quantity}x</strong> ${item.name}</span>
            <span>${item.price * item.quantity} kr</span>
            <button class="quantity-btn" onclick="removeFromCart('${item.name}', 1)">–</button>
        `;
        cartList.appendChild(div);

        orderText += `${item.quantity}x ${item.name} - ${item.price * item.quantity} kr\n`;
    });

    orderText += `\nTotalt: ${total} kr`;
    totalEl.textContent = total;
    orderDetails.value = orderText;
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name.length < 3) {
        alert('Namnet måste vara minst 3 bokstäver.');
        return false;
    }
    if (!/^\d[\d\s+\-()]{9,}$/.test(phone.replace(/\s/g,''))) {
        alert('Ange ett giltigt telefonnummer (endast siffror, minst 10).');
        return false;
    }
    if (address.length < 3 || !/\d/.test(address)) {
        alert('Ange en giltig adress med gatunummer (t.ex. Storgatan 12).');
        return false;
    }
    if (cart.length === 0) {
        alert('Kundvagnen är tom!');
        return false;
    }
    return true;
}

// Initial update
updateCart();
