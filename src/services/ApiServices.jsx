import { instance } from "../utils/Apicustom";
export const postRegister = (fullName, email, password, phone) => {
    return instance.post("v1/user/register", { fullName, email, password, phone });
};
export const postLogin = (username, password, delay) => {
    return instance.post("v1/auth/login", { username, password, delay });
};
export const callCountUser = () => {
    return instance.get("v1/auth/account");
};
export const callLogout = () => {
    return instance.post("/v1/auth/logout");
};
export const getPaginateUser = (current, pageSize) => {
    return instance.get(`v1/user?current=${current}&pageSize=${pageSize}`);
};
export const deleteUser = (id) => {
    return instance.delete(`v1/user/${id}`);
};
export const createUser = (fullName, password, email, phone) => {
    return instance.post(`v1/user`, { fullName, password, email, phone });
};
export const importDataUser = (data) => {
    return instance.post("/v1/user/bulk-create", data);
};
