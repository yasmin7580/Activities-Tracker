import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import ActivitiesCard from '../Components/ActivitiesCard';

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
            <div className="max-w-4xl mx-auto space-y-3">
                {
                    activities?.map((activity, index) =>
                        <ActivitiesCard

                            key={index}
                            task={activity}


                        >



                        </ActivitiesCard>


                    )
                }
            </div>


        </div>
    );
};

export default AllActivities;