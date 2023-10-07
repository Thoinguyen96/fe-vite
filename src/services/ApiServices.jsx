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
