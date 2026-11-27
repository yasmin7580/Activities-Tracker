import axios from 'axios';
import { format, setHours } from 'date-fns';
import { Calendar, CalendarPlus, Clock, FileText, LogOut } from 'lucide-react';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import useNextStartTime from '../../Hooks/useNextStartTime';
import TodayTask from '../TodayTask';
import { useQueryClient } from '@tanstack/react-query';
import AuthContext from '../../Context/AuthContext';

const TaskForm = () => {
    const { user } = useContext(AuthContext)
    const { nextStartTime, refetch } = useNextStartTime()
    const queryClient = useQueryClient()


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit done");

        const form = e.target
        const formData = Object.fromEntries(new FormData(form))


        console.log(formData.endTime);
        formData.email = user.email
        formData.startDate = new Date(formData.startDate)
        formData.endDate = new Date(formData.endDate)
        const [hours, minute] = formData.startTime.split(":")
        const [hours2, minute2] = formData.endTime.split(":")

        formData.startTime = new Date(new Date(formData.startDate).setHours(hours, minute, 0, 0))
        formData.endTime = new Date(new Date(formData.endDate).setHours(hours2, minute2, 0, 0))

        const startTimeHour = format(formData.startTime, 'H')
        const endTimeHour = format(formData.endTime, "H")
        const startTimeMin = format(formData.startTime, 'm')
        const endTimeMin = format(formData.endTime, 'm')

        // if end date is greater than start date no need to check the conditions

        if (new Date(formData.startTime).toDateString() === new Date(formData.endTime).toDateString()) {
            console.log(new Date(formData.startTime).toDateString(), new Date(formData.endTime).toDateString())
            if (startTimeHour > endTimeHour) {
                return toast.error("End time must be after start time")
            }

            if (endTimeHour === startTimeHour) {
                if (endTimeMin < startTimeMin) {
                    return toast.error("End Time must me after start Time")
                }
            }
        }

        // console.log({ startTimeHour, endTimeHour, startTimeMin, endTimeMin });

        console.log(formData)
        delete formData.startDate
        delete formData.endDate
        console.log(formData)
        const toastId = toast.loading("Activity Adding")
        try {
            await axios.post("http://localhost:3000/activities", formData)
            toast.dismiss(toastId)
            form.reset()
            refetch()
            // now i want to fetch "" api
            await queryClient.invalidateQueries({ queryKey: ["todaysTask"] })
            toast.success("Activity Added successfully")
        } catch (error) {

            toast.dismiss(toastId)
            toast.error(error.message || "Something went wrong")

        }

    }



  


    console.log(new Date())
    const today = format(new Date(), "yyyy-MM-dd")



    return (
        <>
            <div className=" bg-[#0f172a] px-4 py-4">
                <div className="max-w-2xl mx-auto">

                    <div className="mb-8">
                        <div className='flex justify-between'>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
                                <span className="text-xs font-semibold uppercase tracking-[2px] text-cyan-400">
                                    Daily Tracker
                                </span>

                            </div>
                           

                        </div>



                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                            Add New Activity <span className="text-cyan-400">+</span>
                        </h1>

                        <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
                            Turn your daily moments into meaningful progress.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-[#1e293b] border border-slate-700/70 rounded-2xl shadow-xl max-w-xl p-3 sm:p-6 space-y-3 ">

                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <label className="flex items-center gap-1 text-sm font-semibold text-slate-200 mb-2">
                                    <Calendar className='text-cyan-400' size={14} />
                                    Start Date
                                </label>
                                <input // gun // input ar value ar type(not data type) and defaultValue ar type same na
                                    className="input w-full h-10 bg-[#0f172a] text-slate-200 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
                                    type="date"
                                    name="startDate"
                                    required
                                    defaultValue={today} // bullet // tumi keno kaj kortecho na?
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-1 text-sm font-semibold text-slate-200 mb-2">
                                    <Calendar className='text-cyan-400' size={14} />

                                    End Date
                                </label>
                                <input // gun // input ar value ar type(not data type) and defaultValue ar type same na
                                    className="input w-full h-10 bg-[#0f172a] text-slate-200 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
                                    type="date"
                                    name="endDate"
                                    required
                                    defaultValue={today} // bullet // tumi keno kaj kortecho na?
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="flex items-center gap-1 text-sm font-semibold text-slate-200 mb-1">
                                    <Clock className='text-cyan-400' size={14} />
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
                                <label className="flex gap-1 items-center text-sm font-semibold text-slate-200 mb-1">
                                    <Clock className='text-cyan-400' size={14} />

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
                            <label className="flex items-center gap-1 text-sm font-semibold text-slate-200 mb-2 ">
                                <FileText className='text-indigo-400' size={14} />
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

                        <button className="btn w-full  rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:bg-cyan-400 text-slate-950 border-none text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all duration-200">
                            Add Activity  <CalendarPlus size={16} />
                        </button>
                        {/* <button className="btn w-full h-12 rounded-xl bg-linear-to-b from-cyan-400 via-blue-500 to-indigo-500 hover:bg-cyan-400 text-slate-950 border-none text-sm font-bold shadow-lg shadow-cyan-500/10 transition-all duration-200">
                            Add Activity  <CalendarPlus size={16} />
                        </button> */}

                    </form>
                </div>
            </div>
            <TodayTask></TodayTask>
        </>
    );
};

export default TaskForm;