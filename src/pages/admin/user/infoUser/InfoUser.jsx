import { Button, Drawer, Space, Avatar, Upload, Form, Input, InputNumber, Tabs, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { callUploadAvatar, changePassword, uploadAvatar } from "../../../../services/ApiServices";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../../../redux/account/userSlice";
const InfoUser = (props) => {
    const { open, setOpen, infoUser } = props;
    const [key, setKey] = useState(1);
    const [avatar, setAvatar] = useState(
        infoUser?.avatar ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${infoUser?.avatar}` : ""
    );
    const refAvatar = useRef(null);
    const [infoAvatar, setInfoAvatar] = useState("");
    const [urlAvatar, setUrlAvatar] = useState("");

    const dispatch = useDispatch();
    const onClose = () => {
        setOpen(false);
    };
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const handleTitle = () => {
        return <h4>Info user</h4>;
    };
    const onFinish = async (values) => {
        if (values.ConfirmPassword === values.newPassword) {
            if (key === "2") {
                const res = await changePassword(values.email, values.password, values.newPassword);
                // console.log(res);
                if (res && res.data) {
                    message.success("Change password success");
                    form2.resetFields();
                } else {
                    message.error(res.message);
                }
            }
            const res = await uploadAvatar(values.fullName, values.phone, infoAvatar.avatar, infoUser.id);

            dispatch(
                doUpdateUser({
                    fullName: values.fullName,
                    phone: values.phone,
                    avatar: infoAvatar.avatar,
                    id: infoUser.id,
                })
            );

            console.log(res);
        } else {
            message.error("password incorrect, please try again");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onChange = (key) => {
        setKey(key);
    };
    // https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/3/16/photo-2-16789543585031180061171.jpg

    const handleClickUpload = () => {
        refAvatar.current.click();
    };
    const handleOnchangeAvatar = async (event) => {
        console.log(event);
        const url = event.target.files[0];

        setUrlAvatar(URL.createObjectURL(url));
        const res = await callUploadAvatar(url);
        if (res && res.data && url) {
            console.log(res);
            const urls = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${res.data.fileUploaded}`;
            setInfoAvatar({ file: event.file, avatar: res.data.fileUploaded });
            setAvatar(urls);
        }
    };

    const items = [
        {
            key: "1",
            label: "Info user",
            children: (
                <>
                    <div className="wrap__view-avatar">
                        <div>
                            {urlAvatar ? (
                                <Space direction="vertical" size={16}>
                                    <Avatar
                                        onClick={handleClickUpload}
                                        size={200}
                                        icon={<img className="view__avatar" src={urlAvatar} />}
                                    />
                                </Space>
                            ) : (
                                <Space direction="vertical" size={16}>
                                    <Avatar
                                        onClick={handleClickUpload}
                                        size={200}
                                        icon={
                                            <img
                                                className="view__avatar"
                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                                                    infoUser.avatar
                                                }`}
                                            />
                                        }
                                    />
                                </Space>
                            )}

                            <input
                                type="file"
                                onChange={handleOnchangeAvatar}
                                ref={refAvatar}
                                style={{ display: "none" }}
                            />
                        </div>
                        <Form
                            form={form1}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                initialValue={infoUser.email}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="fullName"
                                initialValue={infoUser.fullName}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                initialValue={infoUser.phone}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} type="number" controls={false} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </>
            ),
        },
        {
            key: "2",
            label: "Change password",
            children: (
                <>
                    <Form
                        form={form2}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={infoUser.email}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input disabled style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="New password"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Confirm password"
                            name="ConfirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                            ]}
                        >
                            <Input.Password style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            ),
        },
    ];

    return (
        <>
            <Drawer
                title={handleTitle()}
                placement="right"
                width={736}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <br />
                <br />
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

                <br />
            </Drawer>
        </>
    );
};
export default InfoUser;
