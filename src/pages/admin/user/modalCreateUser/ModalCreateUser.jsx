import React, { useState } from "react";
import { Input, Modal, Form, message } from "antd";
import { createUser } from "../../../../services/ApiServices";
const ModalCreateUser = (props) => {
    const { isModalCreateOpen, setIsModalCreateOpen, fetchPaginateUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const handleCancel = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalCreateOpen(false);
        fetchPaginateUser();
    };
    const handleCreateUser = async () => {
        const res = await createUser(fullName, password, email, phone);
        if (res.data?._id) {
            message.success("Create success");
            handleCancel();
        } else {
            message.error(res.message);
        }
    };
    const onPressEnter = (e) => {
        if (e.key === "Enter") {
            handleCreateUser();
        }
    };

    return (
        <>
            <Modal title="Create user" open={isModalCreateOpen} onOk={handleCreateUser} onCancel={handleCancel}>
                <span>Full name</span>
                <Input
                    value={fullName}
                    allowClear={true}
                    onPressEnter={onPressEnter}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name..."
                />

                <br />
                <br />
                <span>Email</span>
                <Input
                    value={email}
                    onPressEnter={onPressEnter}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                />
                <br />
                <br />
                <span>Password</span>
                <Input
                    value={password}
                    onPressEnter={onPressEnter}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                />
                <br />
                <br />
                <span>Phone</span>
                <Input
                    value={phone}
                    onPressEnter={onPressEnter}
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone.."
                />
            </Modal>
        </>
    );
};
export default ModalCreateUser;
