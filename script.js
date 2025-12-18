let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');
    const orderDetails = document.getElementById('order-details');
    
    cartList.innerHTML = '';
    let orderText = 'Order:\n';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        orderText += `${index+1}. ${item.name} - $${item.price}\n`;
    });
    orderText += `\nTotal: $${total}`;
    
    totalEl.textContent = total;
    orderDetails.value = orderText;
}
