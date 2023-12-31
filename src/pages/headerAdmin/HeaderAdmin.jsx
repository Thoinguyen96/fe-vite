import { SmileTwoTone, MenuFoldOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown } from "antd";
import LogOut from "../logout/LogOut";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import InfoUser from "../admin/user/infoUser/InfoUser";

function HeaderAdmin(props) {
    const isAuthentication = useSelector((state) => state.account.authentically);
    const dataUser = useSelector((state) => state.account.user);

    const { toggleCollapsed } = props;
    const [open, setOpen] = useState(false);
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
    return (
        <div className="headerAdmin__wrap ">
            <div className="hide-on-mobile-tablet-d">
                <MenuFoldOutlined onClick={toggleCollapsed} style={{ fontSize: 30, padding: 10 }} />
            </div>
            <Link to={"/"}>
                <img className="logo__tiki" src={logoTiki} alt="logoTIKI.png" />
            </Link>
            <div className="wrap__icon-header hide-on-mobile-tablet-d">
                <Dropdown arrow={false} menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {isAuthentication === true ? (
                                <div className="gap__icon">
                                    <div>
                                        <img
                                            className="image"
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                                                dataUser?.avatar
                                            }`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <span>{dataUser.fullName}</span>
                                </div>
                            ) : (
                                <div className="gap__icon">
                                    <SmileTwoTone
                                        style={{
                                            color: "#1677ff",
                                        }}
                                    />
                                    <span>Tài khoản</span>
                                </div>
                            )}

                            <DownOutlined style={{ width: 12, height: 12 }} />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <InfoUser infoUser={dataUser} open={open} setOpen={setOpen} />
        </div>
    );
}

export default HeaderAdmin;
