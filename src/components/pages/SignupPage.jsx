import React, { useState } from "react";
import { useNavigate, NavLink } from 'react-router';
import { signup } from "../../controllers/userController";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await signup(email, password);
        if (!result.success) {
            console.log("Signup Failed");
            setLoading(false);
            return;
        }
        console.log("LOGIN SUCCESS");
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="w-full max-w-xl bg-white p-12 rounded-2xl shadow-lg">
                <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 block w-full px-5 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full px-5 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {loading ? <h1>Loading....</h1> : ""}
                    </div>

                    <div className="flex justify-between text-base">
                        <NavLink to={'/signin'} className="text-blue-600 hover:underline">Sign in</NavLink>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
