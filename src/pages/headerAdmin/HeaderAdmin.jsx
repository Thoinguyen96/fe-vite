import { SmileTwoTone, MenuFoldOutlined, DownOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
import { Space, Dropdown } from "antd";
import LogOut from "../logout/LogOut";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderAdmin(props) {
    const isAuthentication = useSelector((state) => state.account.authentically);
    const dataUser = useSelector((state) => state.account.user);
    const { toggleCollapsed } = props;
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
        <div className="headerAdmin__wrap">
            <MenuFoldOutlined onClick={toggleCollapsed} style={{ fontSize: 30, padding: 10 }} />
            <Link to={"/"}>
                <img className="logo__tiki" src={logoTiki} alt="logoTIKI.png" />
            </Link>
            <div className="wrap__icon-header">
                <Dropdown arrow={false} menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {isAuthentication === true ? (
                                <div className="gap__icon">
                                    <div>
                                        <img className="image" src={dataUser.avatar} alt="avatar" />
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
        </div>
    );
}

export default HeaderAdmin;
