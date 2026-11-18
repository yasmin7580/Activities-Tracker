import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import ActivitiesCard from '../Components/ActivitiesCard';
import { useState } from 'react';
import { RotateCcw, X } from 'lucide-react';

const AllActivities = () => {
    const [search, setSearch] = useState("") // app | activities app
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const { data: activities = [...Array(10)] } = useQuery({
        queryKey: ["activities", search, from, to], // queryKey is the name of the query
        queryFn: async () => {
            const { data: result } = await axios.get(`http://localhost:3000/activities?search=${search}&from=${from}&to=${to}`)
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



            <div className="max-w-4xl mx-auto space-y-3">

                {
                    activities.map((activity, index) => // 0
                        <ActivitiesCard key={index} task={activity} ></ActivitiesCard>
                    )
                }
            </div>


        </div>
    );
};

export default AllActivities;