import Search from "../search/Search";
import { HomeOutlined, SmileTwoTone, ShoppingCartOutlined } from "@ant-design/icons";
import logoTiki from "../../assets/image/logoTIKI.png";
function Header() {
    return (
        <div className="header__wrap">
            <img className="logo__tiki" src={logoTiki} alt="logoTIKI.png" />
            <Search />
            <div>
                <HomeOutlined
                    style={{
                        color: "#1677ff",
                    }}
                />
                <span>Trang chủ</span>
            </div>
            <div>
                <SmileTwoTone
                    style={{
                        color: "#1677ff",
                    }}
                />
                <span>Tài khoản</span>
            </div>
            <div>
                <ShoppingCartOutlined
                    style={{
                        color: "#1677ff",
                    }}
                />
            </div>
        </div>
    );
}

export default Header;
