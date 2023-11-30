import { InputNumber, Row, Col, Button, Divider, Empty, Steps, Form, Input, message } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteProduct, doResetCart, doUpdateCart } from "../../redux/orderSlice/OrderSlice";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { createOrder } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";

function Order() {
    const dataRole = useSelector((state) => state.order.cart);
    const dataUser = useSelector((state) => state.account.user);
    const [current, setCurrent] = useState("");
    const [totalProduct, setDataProduct] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    console.log(dataRole);
    useEffect(() => {
        if (dataRole.length > 0) {
            const total = dataRole?.map((number) => {
                return number.detail.price * number.quantity;
            });
            const totalMoney = total?.reduce((a, b) => {
                return a + b;
            });
            setDataProduct(totalMoney);
            setCurrent(1);
        } else {
            setDataProduct(0);
        }
    }, [dataRole]);

    const handleQuantityProduct = (value, cart) => {
        dispatch(doUpdateCart({ uQuantity: value, cart, _id: cart.detail._id }));
    };
    const handleDeleteProduct = (_id) => {
        dispatch(doDeleteProduct(_id));
    };
    const handlePurchase = () => {
        if (current === 2) {
            return form.submit();
        }
        setCurrent(2);
    };

    const handleOrder = () => {
        form.submit();
    };

    const onFinish = async (values) => {
        console.log(values.fullName);
        const data = {
            name: values.fullName,
            address: values.address,
            phone: values.phone,
            totalPrice: totalProduct,

            detail: dataRole.map((item) => {
                return {
                    bookName: item.detail.mainText,
                    quantity: item.quantity,
                    _id: item._id,
                };
            }),
        };
        const res = await createOrder(data);
        if (res && res.data) {
            dispatch(doResetCart());
            setCurrent(3);
        } else {
            message(res.message[0]);
        }
    };
    return (
        <>
            {current === 1 && (
                <div className="wrapper__oder-all">
                    <Row>
                        <Col xs={24} sm={24} md={24} xl={24}>
                            <div className="wrap__process">
                                <Steps
                                    className="order__step"
                                    current={current}
                                    items={[
                                        {
                                            title: "Order",
                                        },
                                        {
                                            title: "Ordered",
                                            subTitle: "Left 00:00:08",
                                        },
                                        {
                                            title: "Pay",
                                        },
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} xl={19}>
                            <div className="wrapper__order">
                                <div className="wrap__oder-left">
                                    <div className="content__left">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%",
                                                justifyContent: "space-evenly",
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            All {dataRole.length} product in cart
                                        </div>
                                    </div>
                                    <div>Unit Price</div>
                                    <div>Quantity</div>

                                    <div>Total money</div>
                                </div>
                            </div>
                            {dataRole.length > 0 ? (
                                dataRole.map((item) => {
                                    return (
                                        <div key={item.detail._id} className="wrapper__order2">
                                            <div className="wrap__oder-left">
                                                <div className="content__left">
                                                    <img
                                                        style={{ width: 60, height: 120, objectFit: "cover" }}
                                                        src={`http://localhost:8080/images/book/${item?.detail?.thumbnail}`}
                                                        alt="book"
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            width: "100%",
                                                            justifyContent: "space-evenly",
                                                        }}
                                                    >
                                                        <span>{item.detail.mainText}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item.detail.price)}
                                                </div>

                                                <InputNumber
                                                    className="product__quantity"
                                                    min={1}
                                                    max={item.detail.quantity}
                                                    defaultValue={item.quantity}
                                                    onChange={(values) => handleQuantityProduct(values, item)}
                                                />
                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item.detail.price * item.quantity)}
                                                </div>
                                                <div
                                                    onClick={() => handleDeleteProduct(item.detail._id)}
                                                    className="delete_icon"
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="wrapper__order2">
                                    <Empty description={<div>Not product</div>} />
                                </div>
                            )}
                        </Col>
                        <Col xs={24} sm={24} md={24} xl={5}>
                            <div className="wrap__oder-right">
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <span>Provisional </span>
                                    <span>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalProduct)}
                                    </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <span>Total amount</span>

                                    <span>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalProduct)}
                                    </span>
                                </div>
                                <Divider style={{ margin: "0" }} />
                                <Button onClick={handlePurchase} type="primary" danger>
                                    Purchase
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
            {current === 2 && (
                <div className="wrapper__oder-all">
                    <Row>
                        <Col xs={24} sm={24} md={24} xl={24}>
                            <div className="wrap__process">
                                <Steps
                                    className="order__step"
                                    current={current}
                                    items={[
                                        {
                                            title: "Order",
                                        },
                                        {
                                            title: "Ordered",
                                            subTitle: "Left 00:00:08",
                                        },
                                        {
                                            title: "Pay",
                                        },
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} xl={19}>
                            <div className="wrapper__order">
                                <div className="wrap__oder-left">
                                    <div className="content__left">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%",
                                                justifyContent: "space-evenly",
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            All {dataRole.length} product in cart
                                        </div>
                                    </div>
                                    <div>Unit Price</div>
                                    <div>Quantity</div>

                                    <div>Total money</div>
                                </div>
                            </div>
                            {dataRole.length > 0 ? (
                                dataRole.map((item) => {
                                    return (
                                        <div key={item.detail._id} className="wrapper__order2">
                                            <div className="wrap__oder-left">
                                                <div className="content__left">
                                                    <img
                                                        style={{ width: 60, height: 120, objectFit: "cover" }}
                                                        src={`http://localhost:8080/images/book/${item?.detail.thumbnail}`}
                                                        alt="book"
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            width: "100%",
                                                            justifyContent: "space-evenly",
                                                        }}
                                                    >
                                                        <span>{item.detail.mainText}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item.detail.price)}
                                                </div>
                                                <span>
                                                    <strong>Sole</strong> {item.quantity}
                                                </span>

                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item.detail.price * item.quantity)}
                                                </div>
                                                <div
                                                    onClick={() => handleDeleteProduct(item.detail._id)}
                                                    className="delete_icon"
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="wrapper__order2">
                                    <Empty description={<div>Not product</div>} />
                                </div>
                            )}
                        </Col>
                        <Col xs={24} sm={24} md={24} xl={5}>
                            <div className="wrap__oder-right">
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <span>Provisional </span>
                                    <span>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalProduct)}
                                    </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <span>Total amount</span>

                                    <span>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalProduct)}
                                    </span>
                                </div>
                                <Form
                                    form={form}
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    layout="horizontal"
                                    style={{ maxWidth: 600 }}
                                >
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your username!",
                                            },
                                        ]}
                                        initialValue={dataUser?.fullName}
                                        name="fullName"
                                        label="Name"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your username!",
                                            },
                                        ]}
                                        initialValue={dataUser?.phone}
                                        name="phone"
                                        label="Phone"
                                    >
                                        <InputNumber
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your username!",
                                                },
                                            ]}
                                            value={dataUser?.phone}
                                            type="number"
                                            style={{
                                                width: "100%",
                                            }}
                                            controls={false}
                                        />
                                    </Form.Item>

                                    <Form.Item name="address" label="Address">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </Form>
                                <Divider style={{ margin: "0" }} />
                                <Button onClick={handleOrder} type="primary" danger>
                                    Order
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
            {current === 3 && (
                <div className="wrapper__oder-all">
                    <Row>
                        <Col xs={24} sm={24} md={24} xl={24}>
                            <div className="wrap__process">
                                <Steps
                                    className="order__step"
                                    current={current}
                                    items={[
                                        {
                                            title: "Order",
                                        },
                                        {
                                            title: "Ordered",
                                            subTitle: "Left 00:00:08",
                                        },
                                        {
                                            title: "Pay",
                                        },
                                    ]}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    color: "green",
                                    alignContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <h2>Order Success</h2>
                                <CheckOutlined />
                            </div>
                            <Button onClick={() => navigate("/history")} style={{ display: "flex", margin: "0 auto" }}>
                                watch history
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default Order;
