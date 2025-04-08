document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
  
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Price:</strong> $${product.price}</p>
          <button>Add to Cart</button>
        `;
        productList.appendChild(card);
      });
    } catch (err) {
      productList.innerHTML = '<p>Failed to load products.</p>';
    }
  });
  