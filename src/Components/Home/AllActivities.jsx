import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllActivities = () => {

    const { data: activities } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const { data: result } = await axios.get("http://localhost:3000/activities")
            return result

        }
    })

    return (
        <div className='p-2 bg-[#0f172a]'>
            <h1 className='text-xl mb-2 text-center'>All activities here</h1>
            {
                activities?.map((activity, index) =>


                    <div
                        key={index}
                        className="bg-[#0f172a] border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-orange-300 hover:shadow-sm transition-all duration-200 mb-3"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <h1 className="text-sm font-semibold text-gray-300">
                                📅 {activity.date}
                            </h1>

                            <div className="flex gap-2">
                                <button className="btn btn-xs btn-outline btn-accent rounded-lg px-3">
                                    Edit
                                </button>
                                <button className="btn btn-xs rounded-lg px-3 text-red-500">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs sm:text-sm mb-2">
                            <span className="text-orange-600 font-medium">
                                {activity.startTime}
                            </span>
                            <span className="text-gray-300">→</span>
                            <span className="text-blue-600 font-medium">
                                {activity.endTime}
                            </span>
                        </div>

                        <p className="text-sm  leading-relaxed text-gray-300">
                            {activity.description}
                        </p>
                    </div>

                )
            }

        </div>
    );
};

export default AllActivities;