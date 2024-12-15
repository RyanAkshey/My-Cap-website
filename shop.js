document.addEventListener('DOMContentLoaded', () => {
    const buyNowButton = document.getElementById('buyNow');
    const cartContainer = document.getElementById('cart-container');
    const cartItems = []; // Array to store added items
    const shippingOptions = {
        dhl: 19.99,
        fedex: 4.99
    };

    // Add to Cart Function
    window.addToCart = (productName, productPrice, productImage) => {
        const quantity = parseInt(document.getElementById('quantity').value, 10);

        if (quantity < 1) {
            alert('Please enter a valid quantity.');
            return;
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            // If it exists, update the quantity and total price
            cartItems[existingItemIndex].quantity += quantity;
            cartItems[existingItemIndex].totalPrice += productPrice * quantity;
        } else {
            // If it doesn't exist, add the product to the cart
            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: quantity,
                totalPrice: productPrice * quantity,
                image: productImage
            });
        }

        // Display updated cart
        updateCartDisplay();
        alert(`${quantity} x ${productName} has been added to the cart!`);
    };

    // Update Cart Display Function
    const updateCartDisplay = () => {
        cartContainer.innerHTML = ''; // Clear the cart container

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item mb-3';
            cartItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image mr-3" style="width: 50px; height: 50px;">
                    <div>
                        <h5>${item.name}</h5>
                        <p>${item.quantity} x ₱${item.price.toFixed(2)} = ₱${item.totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Update subtotal and total
        updateTotals();
    };

    // Update Totals Function
    const updateTotals = () => {
        const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
        const selectedShipping = document.querySelector('input[name="shipping"]:checked').id;
        const shippingCost = shippingOptions[selectedShipping];
        const total = subtotal + shippingCost;

        document.querySelector('.list-group-item:nth-child(1) span:last-child').innerText = `₱${subtotal.toFixed(2)}`;
        document.querySelector('.list-group-item:nth-child(2) span:last-child').innerText = `₱${shippingCost.toFixed(2)}`;
        document.querySelector('.list-group-item:nth-child(3) span:last-child').innerText = `₱${total.toFixed(2)}`;
    };

    // Buy Now Button Logic
    buyNowButton.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zip = document.getElementById('zip').value.trim();
        const selectedShipping = document.querySelector('input[name="shipping"]:checked').id;

        if (!firstName || !lastName || !email || !address || !city || !zip) {
            alert('Please fill in all required fields.');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to the cart before proceeding.');
            return;
        }

        const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
        const shippingCost = shippingOptions[selectedShipping];
        const total = subtotal + shippingCost;

        alert(`Thank you for your purchase, ${firstName} ${lastName}!
        \nOrder Summary:
        \nItems: ${cartItems.map(item => `${item.quantity} x ${item.name} (₱${item.totalPrice.toFixed(2)})`).join('\n')}
        \nShipping: ₱${shippingCost.toFixed(2)}
        \nTotal: ₱${total.toFixed(2)}
        \n\nA confirmation email has been sent to ${email}.`);

        // Clear cart
        cartItems.length = 0;
        updateCartDisplay();
    });
});
