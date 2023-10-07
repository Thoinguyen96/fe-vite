import { Button, Checkbox, Form, message, Input, notification } from "antd";
import { postRegister } from "../../services/ApiServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { username, email, password, phone } = values;
        setLoading(true);
        const res = await postRegister(username, email, password, phone);
        setLoading(false);
        console.log(res);

        if (res.data?._id) {
            navigate("/");
            message.success("Đăng ký thành công");
        } else {
            // notification.error(res.message);
            notification.error({
                message: "Có lỗi xảy ra", // nội dung
                description: res.message, // nội dung
                duration: 2, //số giây
            });
        }
    };
    return (
        <div className="register__wrap">
            <div className="register__form">
                <span className="title">Đăng ký người dùng mới</span>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    // style={{
                    //     maxWidth: 800,
                    // }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;
