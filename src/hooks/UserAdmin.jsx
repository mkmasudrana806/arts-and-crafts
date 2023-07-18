import { useContext } from "react";
import { authContext } from "../providers/AuthProvider/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UserAdmin = () => {
    const {user}=useContext(authContext);
    const [axiosSecure]=UseAxiosSecure();
    const {data:userAdmin=[],isLoading,refetch}=useQuery({
        queryKey:['userAdmin',user?.email],
        queryFn: async () => {
            const res=await axiosSecure.get(`/user/admin/${user?.email}`) 
            return res.data.admin
        }
    })
    return [userAdmin,isLoading,refetch]
}
export default UserAdmin