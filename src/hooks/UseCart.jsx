

import {useQuery} from '@tanstack/react-query'
import { useContext } from 'react'
import { authContext } from '../providers/AuthProvider/AuthProvider';
import UseAxiosSecure from './UseAxiosSecure';

const UseCart =() => {
    const {user,loader}=useContext(authContext);
    const [axiosSecure]=UseAxiosSecure();
    const {data:cart=[],isLoading,refetch:reft}=useQuery({
        queryKey:['cart',user?.email],
        queryFn: async () => {
            const res=await axiosSecure(`/carts?email=${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return [cart,isLoading,reft]
}


export default UseCart