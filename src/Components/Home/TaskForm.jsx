import axios from 'axios';
import { format } from 'date-fns';
import { CalendarPlus } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import useNextStartTime from '../../Hooks/useNextStartTime';

const TaskForm = () => {
    const { nextStartTime , refetch } = useNextStartTime()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit done");
        const form = e.target
        const formData = Object.fromEntries(new FormData(form))
        console.log(formData.endTime);
        const toastId = toast.loading("Activity Adding")
        try {
            await axios.post("http://localhost:3000/activities", formData)
            toast.dismiss(toastId)
            toast.success("Activity Added successfully")
            form.reset()
            refetch()

        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.message || "Something went wrong")

        }

    }

    console.log(new Date())
    const today = format(new Date(), "yyyy-MM-dd")



    return (
        <div className=" bg-[#0f172a] px-4 py-12">
            <div className="max-w-2xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Add New Activity <span > +</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Keep track of how you spend your day.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#1e293b] border border-slate-700/70 rounded-2xl shadow-xl max-w-xl p-3 sm:p-6 space-y-3 ">

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Add Date
                        </label>
                        <input // gun // input ar value ar type(not data type) and defaultValue ar type same na
                            className="input w-full h-10 bg-[#0f172a] text-slate-200 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
                            type="date"
                            name="date"
                            required
                            defaultValue={today} // bullet // tumi keno kaj kortecho na?
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">
                                Start Time
                            </label>
                            <input
                                className="input w-full h-10 bg-[#0f172a] text-slate-200 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
                                type="time"
                                name="startTime"
                                required
                                defaultValue={nextStartTime}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">
                                End Time
                            </label>
                            <input
                                className="input w-full h-10 bg-[#0f172a] text-slate-200 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
                                type="time"
                                name="endTime"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Description
                        </label>
                        <textarea
                            className="textarea w-full bg-[#0f172a] text-slate-200 placeholder:text-slate-500 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition resize-y"
                            name="description"
                            placeholder="What did you do?"
                            required
                            rows={1}
                        ></textarea>
                    </div>

                    <button className="btn w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-none text-sm font-bold shadow-lg shadow-cyan-500/10 transition-all duration-200">
                        Add Activity  <CalendarPlus size={16} />
                    </button>

                </form>
            </div>
        </div>
    );
};

export default TaskForm;