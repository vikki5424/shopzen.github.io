
import "./styles/style.css";
import { Link } from "react-router-dom";

const Header = ({ setPage, cartCount, currentUser, onLogout }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        
              <Link to="/">  <button onClick={() => setPage('home')} className="nav-link text-2xl font-bold text-gray-800">
    <div className="flex items-center gap-2">
        {/* Paste SVG Code Here */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 7.5C7.5 5.25 9.25 3.5 11.5 3.5H12.5C14.75 3.5 16.5 5.25 16.5 7.5" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.33 18.25C15.33 20.02 13.85 21.5 12 21.5C10.15 21.5 8.67 20.02 8.67 18.25C8.67 16.48 10.15 15 12 15C13.85 15 15.33 16.48 15.33 18.25Z" stroke="#4F46E5" stroke-width="1.5"/>
          <path d="M3.5 10.5L4.82 18.5C5.2 20.5 6 21.5 8.5 21.5H15.5C18 21.5 18.8 20.5 19.18 18.5L20.5 10.5H3.5Z" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>ShopZen</span>
    </div>
</button></Link>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                
                <Link to="/home"><button onClick={() => setPage('home')} className="nav-link text-gray-600 hover:text-indigo-600 transition cursor-pointer">Home</button></Link>
                <Link to="/products"><button onClick={() => setPage('products')} className="nav-link text-gray-600 hover:text-indigo-600 transition cursor-pointer">Products</button></Link>
                <Link to="/cart"><button onClick={() => setPage('cart')} className="nav-link text-gray-600 hover:text-indigo-600 transition relative cursor-pointer">
                    <i className="fas fa-shopping-cart cursor-pointer"></i>
                    {cartCount > 0 && <span className="cart-count-bubble">{cartCount}</span>}
                </button></Link>
                {currentUser ? (
                    <>
                        <span className="text-gray-700 text-sm sm:text-base whitespace-nowrap">Hi, {currentUser.name}</span>
                        <button onClick={onLogout} className="nav-link text-gray-600 hover:text-indigo-600 transition cursor-pointer">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="sign-in"><button onClick={() => setPage('login')} className="nav-link text-gray-600 hover:text-indigo-600 transition cursor-pointer">Sign In</button></Link>
                        <Link to="sign-up"><button onClick={() => setPage('signup')} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto text-center cursor-pointer">Sign Up</button></Link>
                    </>
                )}
            </div>
        </nav>
    </header>
);


export default Header;
