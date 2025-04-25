import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <main>
      <h2>🛒 No items in your cart</h2>
      <Link to="/" className="keep-shopping-btn">Keep Shopping</Link>
    </main>
  );
}
