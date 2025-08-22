import { FaTruck } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa6";

const HomePage = ({ setPage }) => (
    <section className="space-y-12 sm:space-y-16 py-4">
        {/* --- Hero Section --- */}
        <div className="relative bg-indigo-100 rounded-lg shadow-lg overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left order-2 md:order-1 mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        Summer Sale is Here!
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                        Get up to <span className="font-bold text-indigo-600">50% OFF</span> on new arrivals. Don't miss out on the best deals of the season.
                    </p>
                    <button onClick={() => setPage('products')} className="bg-indigo-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md text-sm sm:text-base cursor-pointer">
                        Shop Collection <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                    <img 
                        src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" 
                        alt="Stylish summer fashion" 
                        className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full max-w-sm md:max-w-full cursor-pointer"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Unavailable"; }}
                    />
                </div>
            </div>
        </div>

        {/* --- Special Offers Section --- */}
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Limited Time Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Offer 1 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                    <div className="relative">
                        <img 
                            src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="Offer on Electronics" 
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x200/CCCCCC/FFFFFF?text=Electronics"; }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setPage('products')} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer">
                                View Deals
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg sm:text-xl mb-2">Electronics Gala</h3>
                        <p className="text-gray-600 text-sm">Save big on headphones, smart watches, and more.</p>
                    </div>
                </div>
                {/* Offer 2 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                   <div className="relative">
                        <img 
                            src="https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="New Arrivals in Men's Fashion" 
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x200/CCCCCC/FFFFFF?text=Men's+Fashion"; }}
                        />
                           <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setPage('products')} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer">
                                    Shop Now
                                </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg sm:text-xl mb-2">Men's Fashion</h3>
                        <p className="text-gray-600 text-sm">Explore the latest trends in men's apparel.</p>
                    </div>
                </div>
                {/* Offer 3 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden group">
                   <div className="relative">
                        <img 
                            src="https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=600" 
                            alt="Hot Deals on Jewelry" 
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x200/CCCCCC/FFFFFF?text=Jewelry"; }}
                        />
                           <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setPage('products')} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer">
                                    Discover More
                                </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg sm:text-xl mb-2">Elegant Jewelry</h3>
                        <p className="text-gray-600 text-sm">Find the perfect piece to complete your look.</p>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Why Shop With Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <FaTruck className="text-4xl text-indigo-500 mb-4 mx-auto" />
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Fast Shipping</h3>
                    <p className="text-gray-500 text-sm">Get your orders delivered to your doorstep in no time.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <FaMedal className="text-4xl text-indigo-500 mb-4 mx-auto" />
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Quality Products</h3>
                    <p className="text-gray-500 text-sm">We source the best products to ensure premium quality.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <FaHeadset className="text-4xl text-indigo-500 mb-4 mx-auto" />
                    <h3 className="font-bold text-lg sm:text-xl mb-2">24/7 Support</h3>
                    <p className="text-gray-500 text-sm">Our team is here to help you around the clock.</p>
                </div>
            </div>
        </div>
    </section>
);

export default HomePage;