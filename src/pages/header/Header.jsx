import Search from "../search/Search";
import { HomeOutlined, SmileTwoTone, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown } from "antd";
import { Button, Badge } from "antd";
import LogOut from "../logout/LogOut";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
function Header() {
    const isAuthentication = useSelector((state) => state.account.authentically);
    const dataUser = useSelector((state) => state.account.user);
    const items = [
        {
            label: <a href="#!">Thông tin tài khoản</a>,
            key: "0",
        },
        {
            label: <LogOut />,
            key: "1",
        },
    ];
    return (
        <div className="header__wrap">
            <img className="logo__tiki" src={logoTiki} alt="logoTIKI.png" />
            <Search />
            <div className="wrap__icon-header">
                <div className="gap__icon">
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
            </div>
        </div>
    );
}

export default Header;
