import React, { useState } from 'react';

const ProductsPage = ({ products, onAddToCart, loading, error }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    if (loading) {
        return <div className="text-center text-xl text-gray-500">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-xl text-red-500">Error: {error}</div>;
    }
    const categories = ['all', ...new Set(products.map(p => p.category))];
    console.log(categories)
    const filteredProducts = products.filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
    ).filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredProducts)
    return (
        <section>
            <div className="mb-8 flex justify-between items-center">
                 <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                 <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8 ">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition capitalize cursor-pointer ${
                            selectedCategory === category
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                        <div className="h-64 flex items-center justify-center p-4">
                            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-md font-semibold text-gray-800 flex-grow">{product.title}</h3>
                            <p className="text-lg text-gray-800 mt-2 font-bold">${product.price.toFixed(2)}</p>
                            <button onClick={() => onAddToCart(product)} className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer">
                                <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductsPage;