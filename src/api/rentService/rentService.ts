import axiosInstance from "../axiosInstance";

const createRentRequest = (payload: FormData) => {
    return axiosInstance.post('/rentals/rentals/', payload);
}

const createRentToOwnRequest = (payload: FormData) => {
    return axiosInstance.post('/rentals/rentals-to-own/', payload);
}

const createStaffCarRentRequest = (payload: object) => {
    return axiosInstance.post('/rentals/rentals/', payload);
}

const getRentRequests = (offset: number, limit: number, user?: number, staff?: boolean) => {
    return axiosInstance.get('/rentals/rentals-requests/', {
        params: {
            limit: limit,
            offset: offset,
            user: user,
            user__is_staff: staff,
        }
    });
}

const getRentToOwnRequests = (offset: number, limit: number) => {
    return axiosInstance.get('/rentals/rentals-to-own/', {
        params: {
            limit: limit,
            offset: offset,
        }
    });
}

const getRentRequestById = (id: string) => {
    return axiosInstance.get(`/rentals/rentals-requests/${id}`);
}

const getRentToOwnRequestById = (id: string) => {
    return axiosInstance.get(`/rentals/rentals-to-own/${id}`);
}

const updateInspectionForm = (payload: FormData, requestId: string) => {
    return axiosInstance.patch(`/rentals/rentals-requests/${requestId}/`, payload);
}

export const removeRentRequest = (id: number) => {
    return axiosInstance.delete(`/rentals/rentals-requests/${id}`);
};

const removeRentToOwnRequest = (id: number) => {
    return axiosInstance.delete(`/rentals/rentals-to-own/${id}/`);
};

const sendPaymentNotification = (id: string) => {
    return axiosInstance.post(`/rentals/rentals-requests/${id}/send_payment_notification/`);
}


async function confirmRentToOwnRequest(id: string | number) {
    return axiosInstance.post(`/rentals/rentals-to-own/${id}/confirm/`);
}


const rentService = {
    createRentRequest,
    createRentToOwnRequest,
    getRentRequests,
    getRentToOwnRequests,
    updateInspectionForm,
    createStaffCarRentRequest,
    removeRentRequest,
    removeRentToOwnRequest,
    getRentRequestById,
    getRentToOwnRequestById,
    sendPaymentNotification,
    confirmRentToOwnRequest
};

export default rentService;
