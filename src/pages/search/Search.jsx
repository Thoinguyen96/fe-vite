import { SearchOutlined } from "@ant-design/icons";

const Search = () => (
    <div className="wrap__search">
        <input className="input__search" placeholder="Bạn tìm gì hôm nay" />
        <div className="icon__search">
            <SearchOutlined />
        </div>
    </div>
);
export default Search;
