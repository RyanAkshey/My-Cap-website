const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');

// Load cart items from localStorage and render them
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
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        // Calculate total price
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Subtotal: ₱${totalPrice.toFixed(2)}`;
    return totalPrice;
}

// Remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCart(); // Reload cart
}

// Update the quantity of an item
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;

        // Ensure quantity doesn't go below 1
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        loadCart(); // Reload cart to reflect changes
    }
}

// Handle checkout process
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const shippingCost = parseFloat(document.getElementById('shipping-method').value);
    const totalPrice = loadCart() + shippingCost;

    // Gather user details
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

    // Confirmation alert
    const confirmation = confirm(`Total Price (with shipping): ₱${totalPrice.toFixed(2)}\nProceed to checkout?`);
    if (confirmation) {
        alert(`Thank you for your purchase, ${firstName}!\n\nYour items will be shipped to:\n${address}, ${city}, ${country}`);
        localStorage.removeItem('cart'); // Clear cart after checkout
        loadCart(); // Reload empty cart
    }
}

loadCart(); // Initial load of cart
