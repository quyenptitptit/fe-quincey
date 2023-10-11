import axiosConfig from "./axiosConfig";

const userService = {
    register: (user) => {
        return axiosConfig.post(`/register`, user)
    },
    login: (user) => {
        return axiosConfig.post(`/login`, user)
    },
    updateUser: (id, user) => {
        return axiosConfig.put(`/user/${id}`, user)
    },
    updatePassword: (user) => {
        return axiosConfig.put(`/updatePassword`, user)
    },
    getUser: (id) => {
        return axiosConfig.get(`/user/${id}`)
    },
    sendEmail: (email) => {
        return axiosConfig.post('/mail', email)
    },
    checkEmail: (email) => {
        return axiosConfig.post("/checkMail", email)
    }
}

export default userService