import { axiosInstance } from "./axios"

export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
    } catch (error) {
        // console.log("Error fetching auth user : ",error)
        return null ;
    }
}

export const logoutUser = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}