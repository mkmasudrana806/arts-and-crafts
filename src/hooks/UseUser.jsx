import {useQuery} from '@tanstack/react-query'

const UseUser =() => {

        const {data:users=[],isLoading,refetch}=useQuery(['users'], async () => {
                const response = await fetch(`https://art-craf-server-jabedweb.vercel.app/users`);
                const data = await response.json();
                return data;
        })
        return [users,isLoading,refetch]
}


export default UseUser