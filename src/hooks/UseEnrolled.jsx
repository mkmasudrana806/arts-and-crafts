

import {useQuery} from '@tanstack/react-query'
import { useContext } from 'react'
import { authContext } from '../providers/AuthProvider/AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const UseEnrolled =() => {
    const {user}=useContext(authContext);
    const [axiosSecure]=UseAxiosSecure();

    const {data:enrolled=[],isLoading,refetch:refe}=useQuery({
        queryKey:['enrolled',user?.email],
        queryFn: async () => {
            const res=await axiosSecure(`/payments?email=${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return [enrolled,isLoading,refe]
}


export default UseEnrolled