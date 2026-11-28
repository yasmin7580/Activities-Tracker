import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ActivitiesCard from '../Components/ActivitiesCard';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const TodayTask = () => {
    const { user } = useContext(AuthContext)
    const email = user.email
    console.log(email);
    const today = new Date().toISOString()
    const { data: todaysTask, refetch } = useQuery({
        queryKey: ["todaysTask", email],
        queryFn: async () => {
            const { data: result } = await axios.get(`https://activities-tracker-backend.vercel.app/activities?from=${today}&to=${today}&email=${email}`)
            console.log(todaysTask);
            return result
        }
    })
    console.log(today)


    return (
        <div className="min-h-screen bg-[#0f1629] p-4 sm:p-6">
            <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-10 bg-linear-to-r from-transparent to-cyan-400"></span>

                <h1 className="text-base font-semibold tracking-wide text-slate-100">
                    Today's <span className="bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Tasks</span>
                </h1>

                <span className="h-px w-10 bg-linear-to-l from-transparent to-indigo-400"></span>
            </div>

            <div className="max-w-4xl mx-auto space-y-3">
                {todaysTask?.result?.length > 0 ? (
                    todaysTask?.map((task) =>
                        <ActivitiesCard
                            key={task._id}
                            task={task}
                            refetch={refetch}
                        >
                        </ActivitiesCard>
                    )

                ) : <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-[#182238] rounded-xl border border-gray-700/50">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-700/50 mb-4">
                        <span className="text-3xl">📝</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        No Tasks Added Yet
                    </h2>

                    <p className="text-sm text-gray-400 max-w-xs">
                        You haven't added any tasks yet. Start organizing your day by adding your first task.
                    </p>
                </div>
                }

            </div>































        </div>
    );
};

export default TodayTask;