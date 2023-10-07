import Search from "../search/Search";
import { HomeOutlined, SmileTwoTone, ShoppingCartOutlined, MenuFoldOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Button, Drawer, Radio, Space, Dropdown } from "antd";
import { Badge } from "antd";
import { useState } from "react";
import LogOut from "../logout/LogOut";
function Header() {
    const items = [
        {
            label: <a href="https://www.antgroup.com">Thông tin tài khoản</a>,
            key: "0",
        },
        {
            label: <LogOut />,
            key: "1",
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div className="header__wrap">
            <MenuFoldOutlined onClick={() => setOpen(true)} />
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

                <Dropdown arrow={false} menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className="gap__icon">
                                <SmileTwoTone
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />
                                <span>Tài khoản</span>
                            </div>
                            <DownOutlined style={{ width: 12, height: 12 }} />
                        </Space>
                    </a>
                </Dropdown>
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
