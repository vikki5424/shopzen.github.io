
import React, { useState } from 'react';
import { FaMinusCircle , FaPlusCircle,FaRegTrashAlt } from "react-icons/fa";

const CartPage = ({ cart, onUpdateQuantity, onPlaceOrder, setPage, currentUser }) => {
    const [formError, setFormError] = useState('');

    if (cart.length === 0) {
        return (
            <div className="lg:col-span-3 text-center bg-white p-8 sm:p-12 rounded-lg shadow-lg py-10">
                <i className="fas fa-shopping-basket text-5xl sm:text-6xl text-gray-300 mb-4 sm:mb-6"></i>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Your cart is empty.</h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => setPage('products')} className="mt-6 bg-indigo-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base cursor-pointer">
                    Start Shopping
                </button>
            </div>
        );
    }

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            setFormError('You must be signed in to place an order.');
            // Add a small delay for the user to see the message before redirecting
            setTimeout(() => setPage('login'), 2000); 
            return;
        }

        const form = e.target;
        // Check if all required fields are filled and trimmed
        const name = form.elements['name'].value.trim();
        const address = form.elements['address'].value.trim();
        const phone = form.elements['phone'].value.trim();

        if (name && address && phone) {
            setFormError('');
            onPlaceOrder();
        } else {
            setFormError('Please fill out all required fields.');
        }
    };

    return (
        <section className="py-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Your Shopping Cart</h1>
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-contain p-1 mb-4 sm:mb-0 sm:mr-4" 
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/CCCCCC/FFFFFF?text=Item+${item.id}`; }}
                            />
                            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto">
                                <div className="sm:flex-grow sm:ml-4 mb-2 sm:mb-0">
                                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">{item.title}</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-800 text-lg sm:text-xl cursor-pointer">
                                        <i className="fas fa-minus-circle"></i>
                                    </button>
                                    <span className="font-bold text-base sm:text-lg">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-800 text-lg sm:text-xl cursor-pointer">
                                        <i className="fas fa-plus-circle"></i>
                                    </button>
                                </div>
                                <p className="font-bold text-base sm:text-lg w-full text-left sm:w-24 sm:text-right mt-2 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => onUpdateQuantity(item.id, 0)} className="ml-0 sm:ml-4 text-red-500 hover:text-red-700 transition mt-2 sm:mt-0 text-lg sm:text-xl cursor-pointer">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h3>
                        <div className="flex justify-between text-gray-600 mb-2 text-sm sm:text-base">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 mb-4 text-sm sm:text-base"><span>Shipping</span><span>FREE</span></div>
                        <div className="flex justify-between font-bold text-lg sm:text-xl border-t pt-4">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold border-b pb-4 mb-4">Shipping Information</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" defaultValue={currentUser?.name || ''} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base" />
                            </div>
                            {formError && <p className="text-red-500 text-sm">{formError}</p>}
                            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition text-base cursor-pointer">Place Order</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
