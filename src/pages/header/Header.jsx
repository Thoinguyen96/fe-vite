import Search from "../search/Search";
import { HomeOutlined, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown, Col, Row, Button, Badge, Skeleton } from "antd";
import LogOut from "../logout/LogOut";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InfoUser from "../admin/user/infoUser/InfoUser";
import { useState } from "react";
function Header() {
    const isAuthentication = useSelector((state) => state.account.authentically);
    const dataUser = useSelector((state) => state.account.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleInfoUser = () => {
        setOpen(true);
    };

    const items = [
        {
            label: (
                <a onClick={() => handleInfoUser()} href="#!">
                    Info account
                </a>
            ),
            key: "info",
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
                            <div>
                                <Badge count={5} size="small">
                                    <ShoppingCartOutlined
                                        style={{
                                            color: "#1677ff",
                                            fontSize: "20px",
                                        }}
                                    />
                                </Badge>
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
                            <Badge count={5} size="small">
                                <ShoppingCartOutlined
                                    style={{
                                        color: "#1677ff",
                                        fontSize: "20px",
                                    }}
                                />
                            </Badge>
                        </div>
                        <InfoUser infoUser={dataUser} open={open} setOpen={setOpen} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Header;
