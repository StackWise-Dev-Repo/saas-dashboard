import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';

export default function UserLogin() {

    const {session, login, signup} = useAuthContext();

    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    const {register: registerLogin, reset: loginReset, handleSubmit: handleSubmitLogin, formState: {errors: loginErrors}} = useForm();
    const { register: registerSignup, reset: signupReset, handleSubmit: handleSubmitSignup, formState: { errors: signupErrors }} = useForm();


    const loginHandleSubmit = (data) => {
        const currentSession = login(data);
        if(Object.keys(currentSession).length === 0) {
            setError("Session Not Found: Invalid account");
            setTimeout(() => {
                setError("");
            }, 3000)
        } else {
            console.log("User logged in", currentSession);
            loginReset();
        }
    }

    const signupSubmitHandler = (data) => {
        const currentSession = signup(data);
        if (Object.keys(currentSession).length === 0) {
            setError("User already exists");
            setTimeout(() => {
                setError("");
            }, 3000)
        } else {
            console.log("User logged in", currentSession);
            signupReset();
        }
    }


    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 [perspective:1000px]">
            {/* Flip Card Container */}
            <motion.div
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative [transform-style:preserve-3d]"
                animate={{ rotateY: isSignUp ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
                {/* FRONT SIDE: LOGIN FORM */}
                <div className="[backface-visibility:hidden]">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-slate-400 text-sm mt-2">Sign in to your account to continue</p>
                        {error && (
                            <p className="text-red-400 text-xs mt-1">{error}</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmitLogin(loginHandleSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    {...registerLogin("email", {
                                        required: "Email is required",
                                    })}
                                />
                            </div>
                            {loginErrors.email && (
                                <p className="text-red-400 text-xs mt-1">{loginErrors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                    {...registerLogin("password", {
                                        required: "Password is required field",
                                        minLength: {
                                            value: 8,
                                            message: "Password should be 8 character long."
                                        }
                                    })}
                                />
                            </div>
                            {loginErrors.password && (
                                <p className="text-red-400 text-xs mt-1">{loginErrors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20 mt-2"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-sm text-slate-400">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className="text-indigo-400 font-semibold hover:underline focus:outline-none ml-1"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>

                {/* BACK SIDE: SIGNUP FORM */}
                <div className="absolute inset-0 p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                    <div>
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                            <p className="text-slate-400 text-sm mt-1">Get started with your free account</p>
                            {error && (
                                <p className="text-red-400 text-xs mt-1">{error}</p>
                            )}
                        </div>

                        <form onSubmit={handleSubmitSignup(signupSubmitHandler)} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        {...registerSignup("username", {
                                            required: "Username is required.",
                                            minLength: {
                                                value: 2,
                                                message: "Name length should be greater than 2 chars."
                                            }
                                        })}
                                    />
                                </div>
                                {
                                    signupErrors.username && (
                                        <p className="text-red-400 text-xs mt-1">{signupErrors.username.message}</p>
                                    )
                                }
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        {...registerSignup("email", {
                                            required: "Email is required",
                                        })}
                                    />
                                </div>
                                {
                                    signupErrors.email && (
                                        <p className="text-red-400 text-xs mt-1">{signupErrors.email.message}</p>
                                    )
                                }
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        {...registerSignup("password", {
                                            required: "Password is required field",
                                            minLength: {
                                                value: 8,
                                                message: "Password should be 8 character long."
                                            }
                                        })}
                                    />
                                </div>
                                {
                                    signupErrors.password && (
                                        <p className="text-red-400 text-xs mt-1">{signupErrors.password.message}</p>
                                    )
                                }
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20 mt-3"
                            >
                                Create Account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    <div className="pt-4 border-t border-slate-800 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)}
                                className="text-indigo-400 font-semibold hover:underline focus:outline-none ml-1"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}