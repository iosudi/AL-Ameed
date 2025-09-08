import axiosInstance from "../axiosInstance";

const createSellRequest = (payload: FormData) => {
    return axiosInstance.post('/services/car-listings/', payload);
}


const getSellRequests = (offset?: number, limit?: number, user?: string) => {
    return axiosInstance.get('/services/car-listings/', {
        params: {
            offset: offset || 0,
            limit: limit || 10,
            user: user || null,
        }
    });
}


const getSellRequestById = (id: string) => {
    return axiosInstance.get(`/services/car-listings/${id}`);
}

export const removeSellRequest = (id: number) => {
    return axiosInstance.delete(`/services/car-listings/${id}`);
};

const sellService = {
    createSellRequest, getSellRequests, removeSellRequest, getSellRequestById
};

export default sellService;
