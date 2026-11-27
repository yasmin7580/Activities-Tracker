import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router';

const SignIn = () => {
    const googleProvider = new GoogleAuthProvider()

    const navigate = useNavigate()
    const handleSignIn = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                navigate("/")
                console.log(userCredential);


            })
            .catch(error => {
                console.log(error);
            })

    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                navigate("/")
            })
            .catch(error => {
                console.log(error);
            })

    }


    return (

        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 sm:p-6">

            <div className="w-full max-w-md bg-[#182238] border border-slate-700/60 rounded-2xl p-6 sm:p-9 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        <span className="text-3xl text-cyan-400">◷</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Welcome Back!
                    </h1>

                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                        Sign in to track your daily activities and stay productive.
                    </p>
                </div>

                <form onSubmit={handleSignIn}>

                    <div className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition-all"
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition-all"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                        </div>

                    </div>

                    {/* Sign In Button */}
                    <button type='submit'
                        className="w-full h-12 mt-7 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-400/10"
                    >
                        Sign In
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="text-xs text-slate-500">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Google Sign In */}
                <button onClick={handleGoogleLogin}
                    type="button"
                    className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0f172a] hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all duration-200"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-slate-400 mt-8">
                    Don't have an account?
                    <Link
                        to="/sign-up"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold ml-1 transition-colors"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>

    );
};

export default SignIn;