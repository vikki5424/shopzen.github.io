const OrderSuccessPage = ({ setPage }) => (
    <section className="py-4">
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg text-center">
            <i className="fas fa-check-circle text-5xl sm:text-6xl text-green-500 mb-4 sm:mb-6"></i>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">Thank you for your purchase. We've received your order and are getting it ready.</p>
            <button onClick={() => setPage('products')} className="bg-indigo-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base cursor-pointer">
                Continue Shopping
            </button>
        </div>
    </section>
);

export default OrderSuccessPage;