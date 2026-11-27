import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';

const useNextStartTime = () => {
    const { data: nextStartTime, refetch } = useQuery({
        queryKey: ["nextStartTime"],
        queryFn: async () => {
            const { data: result } = await axios.get("https://activities-tracker-backend.vercel.app/next-start-time")

            return format(new Date(result), "HH:mm")

        }

    })
    return { nextStartTime, refetch }
};

export default useNextStartTime;