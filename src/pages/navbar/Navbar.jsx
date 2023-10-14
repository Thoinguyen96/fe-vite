import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem("Dash board", "1", <PieChartOutlined />),
    getItem("Manage order", "2", <DesktopOutlined />),
    getItem("Manage books", "3", <DesktopOutlined />),

    getItem("Manage users", "sub1", <UserOutlined />, [
        getItem(
            <Link to={"/admin/user"}>
                <span>User</span>
            </Link>,
            "4"
        ),
        getItem(
            <Link to={"/admin"}>
                <span>Admin</span>
            </Link>,
            "5"
        ),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
    getItem("Files", "9", <FileOutlined />),
];
const Navbar = (props) => {
    const { collapsed, setCollapsed } = props;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
            </Layout>
        </Layout>
    );
};
export default Navbar;
