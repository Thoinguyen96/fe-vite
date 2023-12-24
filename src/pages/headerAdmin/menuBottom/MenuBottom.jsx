import { DashboardOutlined, AuditOutlined, BookOutlined } from "@ant-design/icons";
function MenuBottom() {
    return (
        <div className="menu-bottom__wrap">
            <div className="menu-bottom__style">
                <BookOutlined />
                <a style={{ textDecoration: "none" }} href="/admin/user">
                    List User
                </a>
            </div>
            <div className="menu-bottom__style">
                <DashboardOutlined />
                <a style={{ textDecoration: "none" }} href="/admin">
                    Dash board
                </a>
            </div>
            <div className="menu-bottom__style">
                <AuditOutlined />
                <a style={{ textDecoration: "none" }} href="/admin/books">
                    List Book
                </a>
            </div>
        </div>
    );
}

export default MenuBottom;
