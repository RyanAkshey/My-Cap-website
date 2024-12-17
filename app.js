// Remove item from the cart
function removeItemFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item with the given itemId
    cart = cart.filter(item => item.id !== itemId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart to reflect the changes
    loadCart();
}

// Load cart items on page load (if applicable)
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElem = document.getElementById('total-price');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElem.textContent = "";
        return;
    }

    let totalPrice = 0;
    cartContainer.innerHTML = cart.map(item => {
        totalPrice += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h5>${item.name}</h5>
                    <p>Price: ₱${item.price.toFixed(2)}</p>
                    <p>
                        Quantity: 
                        <button onclick="updateQuantity('${item.id}', 'decrease')">-</button>
                        ${item.quantity}
                        <button onclick="updateQuantity('${item.id}', 'increase')">+</button>
                    </p>
                    <button onclick="removeItemFromCart('${item.id}')" class="remove-btn">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    totalPriceElem.textContent = `Total Price: ₱${totalPrice.toFixed(2)}`;
}

// Update cart quantity
function updateQuantity(itemId, action) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return;
    }

    const item = cart[itemIndex];
    
    // Increase or decrease the quantity based on the action
    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity--;
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart to reflect the changes
    loadCart();
}

// Checkout function (same as before)
async function checkout(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const shippingMethod = parseFloat(document.getElementById('shipping-method').value);
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value;

    // Validate the shipping method is correct
    if (isNaN(shippingMethod) || shippingMethod < 0) {
        alert("Invalid shipping method.");
        return;
    }

    if (!firstName || !lastName || !email || !address || !city || !country) {
        alert("Please fill out all fields.");
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = subtotal + shippingMethod;

    const orderData = {
        first_name: firstName,
        last_name: lastName,
        email,
        address,
        city,
        country,
        shipping_method: shippingMethod,
        cart_data: JSON.stringify(cart),
    };

    try {
        const response = await fetch('checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (response.ok && result.status === "success") {
            alert("Order placed successfully!");

            localStorage.removeItem('cart');
            document.body.innerHTML = `
                <div class="container">
                    <h1>Thank you for your order, ${firstName}!</h1>
                    <p>Your order has been placed successfully. A confirmation email has been sent to ${email}.</p>
                    <button class="btn btn-primary" onclick="window.location.href='index.html'">Return to Home</button>
                </div>
            `;
        } else {
            alert("Failed to place the order: " + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while processing your order.");
    }
}

// Initial cart load
loadCart();
