import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

export const useAuthUser = () => {
    const authUser = useQuery({
        queryFn : getAuthUser,
        queryKey : ["authUser"],
        retry : false,
    })

    return {
        authUser : authUser.data?.user,
        isLoading: authUser.isLoading,
      }
}
