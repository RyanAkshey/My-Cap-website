// Slider functionality for the about section
const sliderImages = document.getElementById('sliderImages');
let currentIndex = 0;

function updateSlider() {
    const imageWidth = sliderImages.children[0]?.clientWidth || 0;
    sliderImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
}

// Automatic sliding every 3 seconds
setInterval(() => {
    if (sliderImages.children.length > 0) {
        currentIndex = (currentIndex + 1) % sliderImages.children.length;
        updateSlider();
    }
}, 3000);

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
    window.location.href = 'add.html'; // Change this to the actual shopping bag page URL
});

// User login/logout/register navigation
document.querySelector('.fa-user-circle-o')?.addEventListener('click', async () => {
    const response = await fetch('path/to/login_api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'user@example.com', // Replace with dynamic user input
            password: 'userpassword' // Replace with dynamic user input
        })
    });

    const data = await response.json();

    if (data.status === 'success') {
        window.location.href = 'userLog.html'; // Redirect to user dashboard
    } else {
        alert(data.message);
    }
});

// Close button functionality
function closeLogin() {
    window.location.href = 'index.html'; // Redirect to index.html
}

// Dynamically add user icon if needed
const userIcon = document.createElement('i');
userIcon.classList.add('fa', 'fa-user-circle-o');
document.body.appendChild(userIcon);

userIcon.addEventListener('click', async () => {
    const response = await fetch('path/to/registration_api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: 'NewUser', // Replace with dynamic user input
            email: 'newuser@example.com', // Replace with dynamic user input
            password: 'securepassword' // Replace with dynamic user input
        })
    });

    const data = await response.json();

    if (data.status === 'success') {
        alert('Registration successful!');
        window.location.href = 'userLog.html';
    } else {
        alert(data.message);
    }
});
