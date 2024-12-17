// Slider functionality for the about section
const sliderImages = document.getElementById('sliderImages');
let currentIndex = 0;

function updateSlider() {
    const imageWidth = sliderImages?.children[0]?.clientWidth || 0; // Safe access
    sliderImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
}

// Automatic sliding every 3 seconds
if (sliderImages && sliderImages.children.length > 0) {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderImages.children.length;
        updateSlider();
    }, 3000);
}

// Update slider size on window resize
window.addEventListener('resize', updateSlider);

// Search functionality
document.querySelector('.fa-search')?.addEventListener('click', () => {
    const searchQuery = prompt("Enter the brand name to search (e.g., Nike, Adidas):");
    if (searchQuery) {
        const products = document.querySelectorAll('#productContainer .product');
        let found = false;

        products.forEach(product => {
            const brand = product.getAttribute('data-brand');
            if (brand?.toLowerCase() === searchQuery.toLowerCase()) {
                found = true;
                product.scrollIntoView({ behavior: 'smooth' });
            }
        });

        if (!found) {
            alert(`No products found for the brand: ${searchQuery}`);
        }
    }
});

// Shopping bag navigation
document.querySelector('.fa-shopping-bag')?.addEventListener('click', () => {
    window.location.href = 'add.html'; // Replace with actual shopping bag page URL
});

// User login/logout/register navigation
document.querySelector('.fa-user-circle-o')?.addEventListener('click', async () => {
    try {
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");

        if (email && password) {
            const response = await fetch('path/to/login_api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.status === 'success') {
                window.location.href = 'userLog.html';
            } else {
                alert(data.message || "Login failed. Please try again.");
            }
        } else {
            alert("Please enter valid email and password.");
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert("An error occurred while logging in.");
    }
});

// Dynamically add user registration icon if needed
const userIcon = document.createElement('i');
userIcon.classList.add('fa', 'fa-user-circle-o');
document.body.appendChild(userIcon);

userIcon.addEventListener('click', async () => {
    try {
        const userName = prompt("Enter your username:");
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");

        if (userName && email && password) {
            const response = await fetch('path/to/Registration_api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, email, password })
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Registration successful!');
                window.location.href = 'userLog.html';
            } else {
                alert(data.message || "Registration failed.");
            }
        } else {
            alert("Please provide all required fields.");
        }
    } catch (error) {
        console.error('Registration Error:', error);
        alert("An error occurred during registration.");
    }
});
