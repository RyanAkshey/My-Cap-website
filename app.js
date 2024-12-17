// Remove item from the cart
function removeItemFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId); // Remove item by ID
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart to reflect changes
}

// Load cart items on page load (if applicable)
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElem = document.getElementById('total-price');

    if (!cartContainer || !totalPriceElem) {
        console.error("Required cart elements not found in the DOM.");
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElem.textContent = "";
        return;
    }

    // Render cart items
    function renderCart() {
        const cartContainer = document.getElementById("cart-container");
        cartContainer.innerHTML = "";

        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                   ${item.name}
                    <div>
                        <h3>${item.name}</h3>
                        <p>Price: ₱${item.price}</p>
                        <div class="quantity-container">
                            <button onclick="decreaseQuantity(${index})">-</button>
                            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                            <button onclick="increaseQuantity(${index})">+</button>
                        </div>
                    </div>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        });

        updateTotalQuantity();
    }

    // Decrease quantity
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            alert("Quantity must be at least 1.");
        }
        renderCart();
    }

    // Increase quantity
    function increaseQuantity(index) {
        cart[index].quantity++;
        renderCart();
    }

    // Update quantity from input
    function updateQuantity(index, newQuantity) {
        const quantity = parseInt(newQuantity, 10);
        if (quantity >= 1) {
            cart[index].quantity = quantity;
        } else {
            alert("Quantity must be at least 1.");
        }
        renderCart();
    }

    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        renderCart();
    }

    // Calculate and display total quantity
    function updateTotalQuantity() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("total-price").innerText = `Total Quantity: ${totalQuantity}`;
    }

    // Checkout function
    async function checkout(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        alert("Proceeding to checkout...");

        const shippingMethod = parseFloat(document.getElementById('shipping-method').value);
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const country = document.getElementById('country').value;

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
                headers: { 'Content-Type': 'application/json' },
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

    // Initial render
    renderCart();
}

// Initial cart load on page load
document.addEventListener('DOMContentLoaded', loadCart);
document.getElementById('checkout-form').addEventListener('submit', checkout); // Attach the event listener for checkout
