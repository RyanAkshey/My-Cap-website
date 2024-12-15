// Register User
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (data.success) {
        alert('Registration successful');
    } else {
        alert('Error: ' + data.message);
    }
});

// Login User
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert('Error: ' + data.message);
    }
});

// Logout User
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    window.location.href = 'index.html';
});
