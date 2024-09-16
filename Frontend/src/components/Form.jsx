import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Form = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { setToken, register, login } = useContext(UserContext);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "", 
    });
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (input.password.length < 5) {
            newErrors.password = "Password must be at least 5 characters long";
            isValid = false;
        }

        if (isSignUp && input.password !== input.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = isSignUp ? await register(input) : await login(input);

            if (response.success) {
                setToken(response.token);

                if (isSignUp) {
                    toast.success('Registration successful! Please log in.');
                    setIsSignUp(false);
                } else {
                    toast.success('Login successful');
                    navigate('/employee');
                }

                setInput({ name: "", email: "", password: "", confirmPassword: "" });
            } else {
                if (!isSignUp) {
                    if (response.error === "Email not found") {
                        toast.error("The email address is not registered");
                        setErrors(prevErrors => ({ ...prevErrors, password: "" }));
                    } else if (response.error === "Incorrect password") {
                        toast.error("Incorrect password");
                        setErrors(prevErrors => ({ ...prevErrors, password: "Incorrect password" }));
                    } else {
                        toast.error("Login failed. Please try again.");
                    }
                } else {
                    toast.error(response.message || "Registration failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error occurred during login/signup", error);
            toast.error("Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-violet-100">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-violet-400">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                value={input.name}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={input.email}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={input.password}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>
                    {isSignUp && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name='confirmPassword'
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Confirm your password"
                                onChange={handleChange}
                                value={input.confirmPassword}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}
                   
                    <button
                        type="submit"
                        className="w-full bg-violet-400 text-white font-semibold py-2 rounded-lg hover:bg-violet-600 transition-colors duration-300"
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {isSignUp ? (
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="text-violet-500 hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="text-violet-500 hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
