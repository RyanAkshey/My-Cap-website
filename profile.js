function loadContent(action) {
    const content = document.getElementById('content');
    content.style.opacity = 0; // Fade-out effect

    // Fetch content dynamically from functions.php
    setTimeout(() => {
        fetch(`functions.php?action=${action}`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data + 
                    `<button class="back-button" onclick="goBack()">Back</button>`;
                content.style.opacity = 1; // Fade-in effect
            })
            .catch(error => {
                content.innerHTML = "<h1>Error</h1><p>Failed to load content.</p>";
                console.error("Error fetching content:", error);
            });
    }, 300);
}

function goBack() {
    window.location.href = 'index.html'; // Redirect back to index.html
}
