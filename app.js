const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');
const cartDataInput = document.getElementById('cart_data');

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>₱${item.price} x ${item.quantity}</p>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Subtotal: ₱${totalPrice.toFixed(2)}`;
    cartDataInput.value = JSON.stringify(cart); // Pass cart data to hidden input
    return totalPrice;
}

loadCart();
