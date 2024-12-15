const searchBar = document.getElementById('searchBar');
const filterBrand = document.getElementById('filterBrand');
const products = document.querySelectorAll('#productContainer .product');

function filterProducts() {
    const searchText = searchBar.value.toLowerCase();
    const selectedBrand = filterBrand.value;

    products.forEach(product => {
        const productName = product.querySelector('.p-name').textContent.toLowerCase();
        const productBrand = product.getAttribute('data-brand');

        if (
            (searchText === '' || productName.includes(searchText)) &&
            (selectedBrand === '' || productBrand === selectedBrand)
        ) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

searchBar.addEventListener('input', filterProducts);
filterBrand.addEventListener('change', filterProducts);