
  //nav active link

  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50; // Adjust for navbar height if necessary
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
          link.classList.add("active");
        }
      });
    }

    // Update active link on scroll
    window.addEventListener("scroll", updateActiveLink);

    // Update active link when page loads to ensure the correct link is active
    updateActiveLink();
  });


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
    window.location.href = 'userLog.html'; // Change this to the user authentication page URL
  });

