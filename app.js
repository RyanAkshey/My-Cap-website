document.addEventListener("DOMContentLoaded", () => {
    // Sample product data
    const products = [];
    const cartData = [];

    // Function to display all available products
    function displayAvailableProducts() {
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = ''; // Clear existing products before displaying

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="100">
                <h4>${product.name}</h4>
                <p>₱${product.price}</p>
                <input type="checkbox" id="product-${product.id}" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" class="select-product">
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Function to update cart based on selected products
    function updateCart() {
        const selectedProducts = document.querySelectorAll(".select-product:checked");
        const cartContainer = document.getElementById("cart-container");
        cartData.length = 0; // Reset cart data

        cartContainer.innerHTML = ''; // Clear cart before updating

        selectedProducts.forEach(checkbox => {
            const productId = parseInt(checkbox.getAttribute("data-id"));
            const productName = checkbox.getAttribute("data-name");
            const productPrice = parseFloat(checkbox.getAttribute("data-price"));
            
            cartData.push({
                id: productId,
                name: productName,
                image: `product${productId}.jpg`, // Adjust image path if necessary
                price: productPrice,
                quantity: 1 // You can allow quantity change if needed
            });
        });

        // Display cart items
        displayCartItems();
    }

    // Function to display cart items
    function displayCartItems() {
        const cartContainer = document.getElementById("cart-container");
        let totalPrice = 0;

        cartData.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₱${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });

        // Update total price
        const totalPriceElement = document.getElementById("total-price");
        totalPriceElement.innerHTML = `Total Price: ₱${totalPrice.toFixed(2)}`;
    }

    // Function to remove item from cart
    function removeItem(itemId) {
        const index = cartData.findIndex(item => item.id === itemId);
        if (index !== -1) {
            cartData.splice(index, 1); // Remove item from array
            document.getElementById("cart-container").innerHTML = ""; // Clear the cart container
            displayCartItems(); // Re-display cart after removal
        }
    }

    // Handle product selection change
    document.body.addEventListener("change", (event) => {
        if (event.target.classList.contains("select-product")) {
            updateCart(); // Update cart when a product is selected or deselected
        }
    });

    // Handle form submission (Checkout)
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Prepare the form data
        const formData = new FormData(checkoutForm);
        const cartDataJson = JSON.stringify(cartData); // Convert cart data to JSON
        formData.append("cart_data", cartDataJson); // Add cart data to form data

        // Optionally, send the form data to the server (e.g., via AJAX or fetch)
        console.log("Form data prepared for submission:", formData);

        // For demonstration, log the cart data and total price
        alert("Checkout successful! The total price is: ₱" + totalPrice.toFixed(2));
    });

    // Display available products when the page loads
    displayAvailableProducts();
});
