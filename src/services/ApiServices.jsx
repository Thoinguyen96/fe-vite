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
export const getPaginateUser = (query) => {
    return instance.get(`v1/user?${query}`);
};
export const deleteUser = (id) => {
    return instance.delete(`v1/user/${id}`);
};
export const createUser = (fullName, password, email, phone) => {
    return instance.post(`v1/user`, { fullName, password, email, phone });
};
export const importDataUser = (data) => {
    return instance.post("v1/user/bulk-create", data);
};
export const editUser = (_id, fullName, phone) => {
    return instance.put("v1/user", { _id, fullName, phone });
};
export const getListBooks = (query) => {
    return instance.get(`v1/book?current=${query}`);
};

// export const callUploadBookImg = (fileImg) => {
//     const bodyFormData = new FormData();
//     bodyFormData.append("fileImg", fileImg);
//     return instance({
//         method: "post",
//         url: "v1/file/upload",
//         data: bodyFormData,
//         headers: {
//             "Content-Type": "multipart/form-data",
//             "upload-type": "book",
//         },
//     });
// };
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return instance.post("v1/file/upload", bodyFormData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book",
        },
    });
};

export const callFetchCategory = () => {
    return instance.get("v1/database/category");
};
export const createBooks = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return instance.post(`v1/book`, { thumbnail, slider, mainText, author, price, sold, quantity, category });
};
export const apiEditBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return instance.put(`v1/book/${id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category });
};
export const deleteBook = (id) => {
    return instance.delete(`v1/book/${id}`);
};
export const getPageBookById = (id) => {
    return instance.get(`v1/book/${id}`);
};
export const createOrder = (data) => {
    return instance.post("v1/order", { ...data });
};
export const getApiHistory = () => {
    return instance.get("v1/history");
};
export const changePassword = (email, oldpass, newpass) => {
    return instance.post(`v1/user/change-password`, { email, oldpass, newpass });
};

export const callUploadAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return instance.post("v1/file/upload", bodyFormData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar",
        },
    });
};
export const uploadAvatar = (fullName, phone, avatar, _id) => {
    return instance.put(`v1/user`, { fullName, phone, avatar, _id });
};
