import axiosInstance from "../axiosInstance";

function getPermissions() {
    return axiosInstance.get(`/users/permissions/`)
}

function updateUserPermissions(payload: object) {
    return axiosInstance.post(`users/assign-permissions/`, payload)
}


const userService = {
    getPermissions,
    updateUserPermissions
}

export default userService