const Toast = ({ message, visible }) => {
    if (!visible) return null;
    return (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-xl animate-fadeIn">
            {message}
        </div>
    );
};

export default Toast;