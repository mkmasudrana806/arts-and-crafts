// import { useEffect } from "react";
// import { useState } from "react";
import {useQuery} from '@tanstack/react-query'

const UseClasses = () => {

    const {data:classesData=[],isLoading,refetch}=useQuery({
        queryKey:['classesData'],
        queryFn: async () => {
            const response = await fetch(`https://art-craf-server-jabedweb.vercel.app/classes`);
            const data = await response.json();
            return data.classes;
        }
    })
    return [classesData,isLoading,refetch]













}

export default UseClasses;