export default function Home() {
    const products = [
      {
        categoryId: "C001",
        productId: "P001",
        brandId: "B001",
        name: "Smartphone",
        description: "Latest 6.7-inch OLED screen with A1 chip.",
        price: 699.99,
        stock: 24
      },
      {
        categoryId: "C002",
        productId: "P002",
        brandId: "B002",
        name: "Bluetooth Speaker",
        description: "Crystal-clear sound with 12hr battery life.",
        price: 149.49,
        stock: 58
      },
      {
        categoryId: "C003",
        productId: "P003",
        brandId: "B003",
        name: "Gaming Laptop",
        description: "RTX 4060 GPU and Intel i7 12th Gen.",
        price: 1299.99,
        stock: 8
      }
    ];
  
    const addToCart = (product) => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart`);
    };
  
    return (
      <main>
        <h2>🛍️ Product Catalog</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {products.map((p, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <h3>{p.name}</h3>
              <p><strong>Product ID:</strong> {p.productId}</p>
              <p><strong>Category ID:</strong> {p.categoryId}</p>
              <p><strong>Brand ID:</strong> {p.brandId}</p>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Price:</strong> ${p.price.toFixed(2)}</p>
              <p><strong>Stock Quantity:</strong> {p.stock}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    );
  }
  