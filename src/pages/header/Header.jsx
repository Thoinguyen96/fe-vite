import Search from "../search/Search";
import { HomeOutlined, ShoppingCartOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown, Col, Row, Button, Badge, theme, Divider } from "antd";
import LogOut from "../logout/LogOut";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InfoUser from "../admin/user/infoUser/InfoUser";
import React, { useEffect, useState } from "react";
const { useToken } = theme;
function Header() {
    const cartQuantity = useSelector((state) => state.order.cart.length);
    const dataCart = useSelector((state) => state.order.cart);
    const isAuthentication = useSelector((state) => state.account.authentically);
    const dataUser = useSelector((state) => state.account.user);
    const [open, setOpen] = useState(false);
    const handleInfoUser = () => {
        setOpen(true);
    };
    const navigate = useNavigate();
    const { token } = useToken();
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: "none",
    };
    const items = [
        {
            label: <span onClick={() => handleInfoUser()}>Info account</span>,
            key: "info",
        },
        {
            label: <span onClick={() => navigate("history")}>History cart</span>,
            key: "History",
        },
        {
            label: <LogOut />,
            key: "logout",
        },
    ];
    if (dataUser.role === "ADMIN") {
        items.unshift({
            label: (
                <Link to={"/admin"} onClick={() => handleInfoUser()}>
                    Manage Admin
                </Link>
            ),
            key: "admin",
        });
    }
    const data = dataCart.map((d) => {
        console.log(d.detail.thumbnail);
        return {
            key: d._id,
            label: (
                <div>
                    <div className="wrap__labelItem" key={d._id}>
                        <a
                            className="wrap__item-cart"
                            target="_blank"
                            onClick={() => handleReturnInfoCart(d.detail)}
                            rel="noopener noreferrer"
                        >
                            <img
                                className="image__item-cart"
                                src={"http://localhost:8080/images/book/" + d.detail.thumbnail}
                                alt="book"
                            />
                            <span style={{ maxWidth: "63%" }}> {d.detail.mainText}</span>
                            <span style={{ marginLeft: "auto" }}>Price {d.detail.price}</span>
                        </a>
                    </div>
                </div>
            ),
        };
    });

    const handleReturnInfoCart = () => {
        navigate("/order");
    };
    const handleViewCart = () => {
        navigate("/order");
    };
    return (
        <div className="header__wrapper">
            <Row>
                <Col xs={24} md={6} lg={24} xl={24}>
                    <div className="header__wrap hide-on-mobile-tablet">
                        <img onClick={() => navigate("/")} className="logo__tiki" src={logoTiki} alt="logoTIKI.png" />
                        <Search />
                        <div className="wrap__icon-header">
                            <div className=" hide-on-mobile-tablet">
                                <HomeOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span>Trang chủ</span>
                            </div>

                            <Dropdown
                                menu={{ items: data }}
                                placement="bottomRight"
                                arrow
                                style={{
                                    color: "#1677ff",
                                    fontSize: "20px",
                                    width: "30%",
                                }}
                                dropdownRender={(menu) => (
                                    <div style={contentStyle}>
                                        {React.cloneElement(menu, {
                                            style: menuStyle,
                                        })}

                                        <Space
                                            style={{
                                                padding: 8,
                                                display: "block",
                                            }}
                                        >
                                            {data.length > 0 ? (
                                                <Button
                                                    onClick={handleViewCart}
                                                    style={{ marginLeft: "auto", display: "flex" }}
                                                    type="primary"
                                                    danger
                                                >
                                                    View cart
                                                </Button>
                                            ) : (
                                                <div>Giỏ hàng trống</div>
                                            )}
                                        </Space>
                                    </div>
                                )}
                            >
                                <div>
                                    <Badge count={cartQuantity > 0 ? cartQuantity : 0} size="small">
                                        <ShoppingCartOutlined
                                            style={{
                                                color: "#1677ff",
                                                fontSize: "20px",
                                            }}
                                        />
                                    </Badge>
                                </div>
                            </Dropdown>

                            {isAuthentication === true ? (
                                <Dropdown arrow={false} menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <div className="gap__icon">
                                                <div>
                                                    <img className="image" src={dataUser.avatar} alt="avatar" />
                                                </div>
                                                <span>{dataUser.fullName}</span>
                                                <DownOutlined style={{ width: 12, height: 12 }} />
                                            </div>
                                        </Space>
                                    </a>
                                </Dropdown>
                            ) : (
                                <div className="gap__icon">
                                    <NavLink to={"/login"}>
                                        <Button type="primary">Log in</Button>
                                    </NavLink>
                                    <NavLink to={"/register"}>
                                        <Button type="dashed">Sign up</Button>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <InfoUser infoUser={dataUser} open={open} setOpen={setOpen} />
                    </div>
                    <div className="header__wrap hide-on-pc">
                        <div className="header__mobile-table">
                            <img
                                onClick={() => navigate("/")}
                                className="logo__tiki"
                                src={logoTiki}
                                alt="logoTIKI.png"
                            />
                            <div className="wrap__icon-header">
                                <div className=" hide-on-mobile-tablet">
                                    <HomeOutlined
                                        style={{
                                            color: "#1677ff",
                                        }}
                                    />
                                    <span>Trang chủ</span>
                                </div>

                                {isAuthentication === true ? (
                                    <Dropdown arrow={false} menu={{ items }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <div className="gap__icon">
                                                    <div>
                                                        <img className="image" src={dataUser.avatar} alt="avatar" />
                                                    </div>
                                                    <span>{dataUser.fullName}</span>
                                                    <DownOutlined style={{ width: 12, height: 12 }} />
                                                </div>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                ) : (
                                    <div className="gap__icon">
                                        <NavLink to={"/login"}>
                                            <Button type="primary">Log in</Button>
                                        </NavLink>
                                        <NavLink to={"/register"}>
                                            <Button type="dashed">Sign up</Button>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            <Search />
                            <Dropdown
                                menu={{ items: data }}
                                placement="bottomRight"
                                arrow
                                style={{
                                    color: "#1677ff",
                                    fontSize: "20px",
                                    width: "30%",
                                }}
                                dropdownRender={(menu) => (
                                    <div style={contentStyle}>
                                        {React.cloneElement(menu, {
                                            style: menuStyle,
                                        })}

                                        <Space
                                            style={{
                                                padding: 8,
                                                display: "block",
                                            }}
                                        >
                                            {data.length > 0 ? (
                                                <Button
                                                    onClick={handleViewCart}
                                                    style={{ marginLeft: "auto", display: "flex" }}
                                                    type="primary"
                                                    danger
                                                >
                                                    View cart
                                                </Button>
                                            ) : (
                                                <div>Giỏ hàng trống</div>
                                            )}
                                        </Space>
                                    </div>
                                )}
                            >
                                <div>
                                    <Badge count={cartQuantity > 0 ? cartQuantity : 0} size="small">
                                        <ShoppingCartOutlined
                                            style={{
                                                color: "#1677ff",
                                                fontSize: "20px",
                                            }}
                                        />
                                    </Badge>
                                </div>
                            </Dropdown>
                        </div>
                        <InfoUser infoUser={dataUser} open={open} setOpen={setOpen} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Header;
