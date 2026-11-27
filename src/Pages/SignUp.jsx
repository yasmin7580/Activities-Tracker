import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log("signup");
        const form = e.target
        const toastId = toast.loading("Signing Up")
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                console.log(userCredential);
                const user = userCredential.user;
                console.log(user);
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid,
                }

                const { data } = await axios.post('http://localhost:3000/user', userInfo)
                if (data.insertedId) {
                    toast.dismiss(toastId)
                    toast.success("SignUp successful")
                    toast.dismiss(toastId)
                    navigate("/")
                }
                else {
                    toast.error("Failed to sign up")
                }

                // ...
            })
            .catch(error => {
                toast.dismiss(toastId)
                toast.error(error.message)
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
                        Create Your Account
                    </h1>

                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                        Start tracking your daily activities and make every moment count.
                    </p>
                </div>

                <form onSubmit={handleSignUp}>

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

                    {/* Signup Button */}
                    <button type='submit'
                        className="w-full h-12 mt-7 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-400/10"
                    >
                        Create Account
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="text-xs text-slate-500">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Google Signup */}
                <button
                    type="button"
                    className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0f172a] hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all duration-200"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign up with Google
                </button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-slate-400 mt-8">
                    Already have an account?
                    <Link
                        to="/sign-in"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold ml-1 transition-colors"
                    >
                        Sign In
                    </Link>
                </p>

            </div>

        </div>

    );
};

export default SignUp;