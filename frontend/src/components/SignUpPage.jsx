import { useState } from "react";
import { Link } from "react-router";
const SignUpPage = ({ onSignUp, setPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onSignUp(name, email, password);
        if (!success) {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div className="max-w-xs sm:max-w-md mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 cursor-pointer">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"/>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" onClick={onSignUp} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 text-base cursor-pointer">Sin Up</button>
            </form>
               <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
                Already have an account? <Link to="sign-in"><button onClick={() => setPage('login')} className="text-indigo-600 hover:underline cursor-pointer">Sign In</button></Link>
            </p>
        </div>
    );
};
export default SignUpPage