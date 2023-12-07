import { Button, Checkbox, Form, message, Input } from "antd";
import { useState } from "react";
import { postLogin } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doAccountLogin } from "../../redux/account/userSlice";
function Login() {
    const disPath = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState(false);

    const onFinish = async (values) => {
        const { username, password } = values;
        setSubmit(true);
        const res = await postLogin(username, password, 2000);
        setSubmit(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            disPath(doAccountLogin(res.data.user));
            navigate("/");
            message.success("đăng nhập thành công");
        } else {
            message.error(res.message);
        }
    };
    return (
        <div className="wrap__login">
            <div className="form__login">
                <h3>Đăng Nhập</h3>

                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="username"
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                    <div className="login__suggest">
                        <span className="title">Bạn chưa có tài khoản?</span>
                        <a href="/register">Đăng ký</a>
                    </div>
                    <a href="/">Về trang chủ</a>
                </Form>
            </div>
        </div>
    );
}

export default Login;
