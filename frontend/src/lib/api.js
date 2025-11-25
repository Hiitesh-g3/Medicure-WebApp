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

export const fetchPredictionHistory = async () => {
    try {
        const res = await axiosInstance.get("/prediction/history",{ withCredentials : true});
        return res.data;
    } catch (error) {
        return null;
    }
}

export const predictMedicineFromImage = async (formData) => {
    try {
        // ✅ Send to Express → Flask
      const res = await axiosInstance.post("http://localhost:3001/api/medicure/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    //   console.log(res.data);
      return res.data ;
    } catch (error) {
        return null;
    }
}

export const predictMedicineFromText = async (manualQuery) => {
    try {
        // ✅ Send to Express → Flask
      const res = await axiosInstance.post("http://localhost:3001/api/inference/search", {
        query: manualQuery.trim(),
      });
    //   console.log(res.data);
      return res.data ;
    } catch (error) {
        return null;
    }
}

export const fetchMetricsData = async () => {
  try {
      // NOTE: This assumes you set up a new Express endpoint '/api/metrics'
      // that handles running the Python metrics calculation and returns the JSON result.
      const res = await axiosInstance.get("/api/metrics");
      return res.data; 
  } catch (error) {
      console.error("Error fetching pipeline metrics:", error);
      return null; // Return null on failure
  }
}