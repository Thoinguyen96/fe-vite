import Search from "../search/Search";
import { HomeOutlined, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown, Col, Row, Button, Badge, Skeleton } from "antd";
import LogOut from "../logout/LogOut";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InfoUser from "../admin/user/infoUser/InfoUser";
import { useEffect, useState } from "react";
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

    const itemsCart = [
        {
            key: "1",
            type: "group",
            label: <span style={{ color: "black", fontWeight: 500 }}> Product in cart</span>,
            children: dataCart.map((d) => {
                return {
                    key: d.id,
                    label: (
                        <div>
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
                                <span> {d.detail.mainText}</span>
                                <span style={{ marginLeft: "auto" }}>Price {d.detail.price}</span>
                            </a>
                        </div>
                    ),
                };
            }),
        },
    ];

    function slugify(string) {
        const a = "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
        const b = "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
        const p = new RegExp(a.split("").join("|"), "g");
        return string
            .toString()
            .toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
            .replace(/đ/gi, "d")
            .replace(/\s+/g, "-")
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            .replace(/&/g, "-and-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }
    const handleReturnInfoCart = (data) => {
        const slug = slugify(data.mainText);
        navigate(`book/${slug}?id=${data._id}`);
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
                                menu={{ items: itemsCart }}
                                placement="bottomRight"
                                arrow
                                style={{
                                    color: "#1677ff",
                                    fontSize: "20px",
                                    width: "30%",
                                }}
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
                            <Badge count={4} size="small">
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
