import axios from "./AxiosInstance";

export const createdeals=async()=>{
    return await axios.post("/api/deal/createdeal")
}
export const getDeals = async () => {
  return await axios.get("/api/deal/getdeal");
};

export const getDealById = async (id) => {
  return await axios.get(`/api/deal/getsingledeal?id=${id}`);
};

export const updateDealStatus = async (id, status) => {
  return await axios.put(`/api/deal/${id}/status`, { status });
};
