import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useNextStartTime = () => {
    const { data: nextStartTime ,refetch} = useQuery({
        queryKey: ["nextStartTime"],
        queryFn: async () => {
            const { data: result } = await axios.get("http://localhost:3000/next-start-time")
            return result

        }

    })
    return { nextStartTime,refetch }
};

export default useNextStartTime;