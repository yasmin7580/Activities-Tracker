import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import ActivitiesCard from '../Components/ActivitiesCard';
import { useContext, useState } from 'react';
import { CalendarCheck, Plus, RotateCcw, X } from 'lucide-react';
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router';

const AllActivities = () => {
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("") // app | activities app
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const email = user.email

    const { data: activities = [...Array(10)], refetch } = useQuery({
        queryKey: ["activities", search, from, to, email,], // queryKey is the name of the query
        queryFn: async () => {
            const { data: result } = await axios.get(`https://activities-tracker-backend.vercel.app/activities?search=${search}&from=${from}&to=${to}&email=${email}`)
            return result

        }
    })

    const handleReset = () => {
        setSearch("")
        setFrom("")
        setTo("")

    }

    return (

        <div className='p-2 bg-[#0f172a]'>

            {
                activities.length > 0 &&
                <>

                    <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="h-px w-10 bg-linear-to-r from-transparent to-cyan-400"></span>

                        <h1 className="text-xl font-semibold tracking-wide text-slate-100">
                            All <span className="bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Activities</span>
                        </h1>

                        <span className="h-px w-10 bg-linear-to-l from-transparent to-indigo-400"></span>
                    </div>

                    <div className=''>
                        <div className='flex gap-1'>
                            <input className='input w-full mb-2 bg-[#182238] outline-none' type="text"
                                placeholder='Search Description'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            {(search || from || to) &&
                                <button onClick={handleReset} className='btn border border-red-500 bg-red-500/10 text-red-500'><X size={19} /></button>
                            }
                        </div>
                        <div className='grid grid-cols-2 gap-1 mb-2'>
                            <input className='input bg-[#182238] outline-none' type="date"
                                placeholder='Add start-date'
                                onChange={(e) => setFrom(e.target.value)}
                                value={from}
                            />
                            <input className='input bg-[#182238] outline-none' type="date"
                                placeholder='Add end-date'
                                onChange={(e) => setTo(e.target.value)}
                                value={to}
                            />
                        </div>

                    </div>

                    <div className="max-w-4xl mx-auto space-y-3 ">

                        {
                            activities.map((activity, index) => // 0
                                <ActivitiesCard key={index} task={activity} refetch={refetch} ></ActivitiesCard>
                            )
                        }
                    </div>
                </>


            }
            {
                activities.length < 0 &&
                <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-slate-700/50 bg-[#182238] px-4 py-8">

                    <div className="flex max-w-sm flex-col items-center text-center">

                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/10 bg-[#0f172a]">
                            <CalendarCheck
                                size={38}
                                className="text-cyan-400"
                                strokeWidth={1.5}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-white">
                            No Activities Yet!
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            Your day is waiting to be organized.
                            Start tracking your activities and make
                            every moment count.
                        </p>

                        <Link to={"/"}
                            className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-95"
                        >
                            <Plus size={18} />
                            Add Your First Activity
                        </Link>

                    </div>
                </div>
            }


        </div>
    );
};

export default AllActivities;