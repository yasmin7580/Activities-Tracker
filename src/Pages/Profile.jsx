import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router';
import { CircleUserRound, LogOut, Mail, Settings, ShieldCheck, UserRoundPen } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(user);
    const handleSignOut = () => {

        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout from your account?",
            icon: "warning",
            background: "#182238",
            color: "#f1f5f9",
            iconColor: "#f87171",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Stay Logged In",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#334155",
            reverseButtons: true,
            focusCancel: true,
            customClass: {
                popup: "rounded-2xl border border-slate-700",
                title: "text-xl font-bold",
                htmlContainer: "text-sm text-slate-400",
                confirmButton: "rounded-lg px-5 py-2.5 text-sm font-semibold",
                cancelButton: "rounded-lg px-5 py-2.5 text-sm font-semibold"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth).then(() => {
                    navigate("/sign-in");
                });
            }
        });


    }

    return (
        <div className='p-2'>
            {
                user &&


                <div className="min-h-screen bg-[#0f172a] px-4 py-8 sm:px-6">

                    <div className="mx-auto max-w-3xl">

                        {/* Heading */}
                        <div className="mb-5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                                Personal Dashboard
                            </p>
                            <h1 className="mt-1 text-2xl font-bold text-white">
                                My Profile
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage your personal information and account preferences.
                            </p>
                        </div>

                        {/* Profile Card */}
                        <div className="">

                            {/* Profile Header */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex min-w-0 items-center gap-3">

                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-20 w-20 shrink-0 rounded-full border-2 border-cyan-400/40 bg-slate-700 object-cover"
                                    />

                                    <div className="min-w-0">
                                        <h2 className="truncate text-xl font-bold text-white">
                                            {user.displayName || "User"}
                                        </h2>
                                        <p className="mt-1 break-all text-sm text-slate-400">
                                            {user.email}
                                        </p>
                                        <div className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                                            <ShieldCheck size={14} />
                                            Active Account
                                        </div>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400/20 active:scale-95"
                                >
                                    <UserRoundPen size={17} />
                                    Edit Profile
                                </button>

                            </div>

                            <div className="my-5 border-t border-slate-700/70" />

                            {/* Personal Information */}
                            <div>
                                <h3 className="mb-3 text-base font-semibold text-white">
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <div className="rounded-lg border border-slate-700/60 bg-[#0f172a]/60 p-3">
                                        <div className="mb-2 flex items-center gap-2 text-cyan-400">
                                            <UserRoundPen size={16} />
                                            <span className="text-xs font-medium uppercase tracking-wider">
                                                Full Name
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-200">
                                            {user.displayName || "Not provided"}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-slate-700/60 bg-[#0f172a]/60 p-3">
                                        <div className="mb-2 flex items-center gap-2 text-cyan-400">
                                            <Mail size={16} />
                                            <span className="text-xs font-medium uppercase tracking-wider">
                                                Email Address
                                            </span>
                                        </div>
                                        <p className="break-all text-sm font-medium text-slate-200">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Account Settings */}
                            <div className="mt-6">
                                <h3 className="mb-3 text-base font-semibold text-white">
                                    Account Settings
                                </h3>

                                <button
                                    type="button"
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-700/60 bg-[#0f172a]/40 p-3 text-left transition hover:border-cyan-400/30 hover:bg-[#0f172a]/80"
                                >
                                    <Settings size={19} className="text-cyan-400" />
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Account Settings
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Manage your account preferences
                                        </p>
                                    </div>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="mt-5 flex justify-end border-t border-slate-700/70 pt-4">
                                <button
                                    onClick={handleSignOut}
                                    className="group flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500 hover:text-white active:scale-95 sm:w-auto"
                                >
                                    <LogOut size={17} className="transition-transform group-hover:translate-x-1" />
                                    Logout
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            }

        </div>
    );
};

export default Profile;