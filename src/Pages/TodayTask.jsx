import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ActivitiesCard from '../Components/ActivitiesCard';

const TodayTask = () => {
    const { data: todaysTask } = useQuery({
        queryKey: ["todaysTask"],
        queryFn: async () => {
            const { data: result } = await axios.get(`http://localhost:3000/activities?date=today`)
            return result
        }
    })


    return (
        <div className="min-h-screen bg-[#0f1629] p-4 sm:p-6">
            <h1 className='text-md mb-8 text-center'>Today's Tasks here</h1>

            <div className="max-w-4xl mx-auto space-y-3">
                {todaysTask?.map((task) => (
                    <ActivitiesCard
                        key={task._id}
                        task={task}
                    >

                    </ActivitiesCard>

                ))}





            </div>































        </div>
    );
};

export default TodayTask;