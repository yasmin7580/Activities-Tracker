import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const useNextStartTime = () => {
    const { user } = useContext(AuthContext)
    const { data: nextStartTime, refetch } = useQuery({
        queryKey: ["nextStartTime"],
        queryFn: async () => {
            const { data: result } = await axios.get(`https://activities-tracker-backend.vercel.app/next-start-time?email=${user.email}`)
            console.log(result)

            return format(new Date(result), "HH:mm")

        }

    })
    return { nextStartTime, refetch }
};

export default useNextStartTime;