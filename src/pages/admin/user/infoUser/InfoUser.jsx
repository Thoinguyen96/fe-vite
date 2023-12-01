import { Button, Drawer, Space, Avatar, Upload, Form, Input, InputNumber, Tabs, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { callUploadAvatar, changePassword, uploadAvatar } from "../../../../services/ApiServices";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../../../redux/account/userSlice";
const InfoUser = (props) => {
    const { open, setOpen, infoUser } = props;
    const [key, setKey] = useState(1);
    const [avatar, setAvatar] = useState(
        infoUser?.avatar ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${infoUser?.avatar}` : ""
    );
    const [infoAvatar, setInfoAvatar] = useState("");
    const dispatch = useDispatch();
    console.log(infoUser);
    const onClose = () => {
        setOpen(false);
    };
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();

    const handleTitle = () => {
        return <h4>Info user</h4>;
    };
    const onFinish = async (values) => {
        console.log("Success:", values);
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
        console.log(key);
        setKey(key);
    };
    // https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/3/16/photo-2-16789543585031180061171.jpg
    const propss = {
        name: "file",
        maxCount: 1,
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        customRequest: (file) => handleAvatar(file),

        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const handleAvatar = async (file) => {
        console.log(file);
        const res = await callUploadAvatar(file.file);
        if (res && res.data) {
            console.log(res);
            const url = `http://localhost:8080/images/avatar/${res.data.fileUploaded}`;
            setInfoAvatar({ file: file.file, avatar: res.data.fileUploaded });
            setAvatar(url);
        } else {
            const url = URL.createObjectURL(file.file);
            setAvatar(url);
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
                            <Space direction="vertical" size={16}>
                                <Avatar size={200} icon={<img className="view__avatar" src={avatar} />} />
                            </Space>
                            <Upload {...propss}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
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
