import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results
    window.location.href = `/products?search=${searchQuery}`;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopHub</span>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FiSearch />
            </button>
          </form>

          <div className="header-actions">
            <Link to="/cart" className="cart-link">
              <FiShoppingCart size={24} />
              {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
            </Link>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">All Products</Link>
          <Link to="/products/electronics" className="nav-link">Electronics</Link>
          <Link to="/products/fashion" className="nav-link">Fashion</Link>
          <Link to="/products/homeAppliances" className="nav-link">Appliances</Link>
          <Link to="/products/books" className="nav-link">Books</Link>
          <Link to="/products/beauty" className="nav-link">Beauty</Link>
          <Link to="/products/sports" className="nav-link">Sports</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
