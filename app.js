const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: ₱${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total Price: ₱${totalPrice}`;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function goBack() {
    // Redirect to the shop page (update the link as needed)
    window.location.href = "shop.html"; // Replace with your shop's page URL
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate total price
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    // Show confirmation and receipt
    const confirmation = confirm(`Your total price is ₱${totalPrice}. Do you want to proceed to checkout?`);
    if (confirmation) {
        alert(`Thank you for your purchase! Your receipt:\n\n${generateReceipt(cart, totalPrice)}`);
        // Optionally clear the cart after checkout
        localStorage.removeItem('cart');
        loadCart();
    }
}

function generateReceipt(cart, totalPrice) {
    let receipt = "Receipt:\n\n";
    cart.forEach(item => {
        receipt += `${item.name} x${item.quantity} - ₱${item.price * item.quantity}\n`;
    });
    receipt += `\nTotal Price: ₱${totalPrice}`;
    return receipt;
}

loadCart();
