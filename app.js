async function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const shippingCost = parseFloat(document.getElementById('shipping-method').value);

    // Gather user details
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

    // Calculate total price
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = subtotal + shippingCost;

    // Confirmation alert
    const confirmation = confirm(`Total Price (with shipping): ₱${totalPrice.toFixed(2)}\nProceed to checkout?`);
    if (!confirmation) return;

    // Prepare data to send
    const orderData = {
        first_name: firstName,
        last_name: lastName,
        email,
        address,
        city,
        country,
        shipping_method: shippingCost,
        cart_data: JSON.stringify(cart),
    };

    try {
        const response = await fetch('process_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.text();
        if (response.ok) {
            alert("Order placed successfully!");
            localStorage.removeItem('cart'); // Clear cart
            window.location.href = "index.html"; // Redirect to homepage
        } else {
            console.error('Server error:', result);
            alert("Failed to place the order. Please try again.");
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert("An error occurred while processing your order. Please try again.");
    }
}