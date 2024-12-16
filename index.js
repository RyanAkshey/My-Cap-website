
  //slider ng about
  const sliderImages = document.getElementById('sliderImages');
  let currentIndex = 0;

  function updateSlider() {
      const imageWidth = sliderImages.children[0].clientWidth;
      sliderImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
  }

  // Automatic sliding every 3 seconds
  setInterval(() => {
      currentIndex = (currentIndex + 1) % sliderImages.children.length;
      updateSlider();
  }, 3000);

  // Update slider size on window resize
  window.addEventListener('resize', updateSlider);
  
  // Search functionality
  document.querySelector('.fa-search').addEventListener('click', () => {
    const searchQuery = prompt("Enter the brand name to search (e.g., Nike, Adidas):");
    if (searchQuery) {
      const products = document.querySelectorAll('#productContainer  .product');
      let found = false;

      products.forEach(product => {
        const brand = product.getAttribute('data-brand');
        if (brand && brand.toLowerCase() === searchQuery.toLowerCase()) {
          found = true;
          product.scrollIntoView({ behavior: 'smooth' });
        }
      });

      if (!found) {
        alert("No products found for the brand: " + searchQuery);
      }
    }
  });

  // Shopping bag navigation
  document.querySelector('.fa-shopping-bag').addEventListener('click', () => {
    window.location.href = 'add.html'; // Change this to the actual shopping bag page URL
  });

  // User login/logout/register navigation
  document.querySelector('.fa-user-circle-o').addEventListener('click', () => {
    window.location.href = 'userLog.html'; // Redirect to login page
});


  function closeRegistration() {
    window.location.href = 'index.html'; // Redirect to the home page or another page
  }

