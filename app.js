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
                <p>Quantity: 
                    <button onclick="updateQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Subtotal: ₱${totalPrice.toFixed(2)}`;
    return totalPrice;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;

        // Ensure quantity is at least 1
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart(); // Reload cart to reflect updated quantities
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const shippingCost = parseFloat(document.getElementById('shipping-method').value);
    const totalPrice = loadCart() + shippingCost;

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    if (!firstName || !lastName || !email || !address || !city || !country) {
        alert("Please fill out all fields.");
        return;
    }

    const confirmation = confirm(`Total Price (with shipping): ₱${totalPrice.toFixed(2)}\nProceed to checkout?`);
    if (confirmation) {
        alert(`Thank you for your purchase, ${firstName}!\n\nYour items will be shipped to:\n${address}, ${city}, ${country}`);
        localStorage.removeItem('cart');
        loadCart();
    }
}

loadCart();
