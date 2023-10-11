import { Table, Input, Pagination } from "antd";
import { getPaginateUser } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
function User() {
    const [page, setPage] = useState(5);
    const [dataUser, setDataUser] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");

    useEffect(() => {
        fetchPaginateUser();
    }, []);
    const fetchPaginateUser = async () => {
        const res = await getPaginateUser();
        if (res && res.data) {
            setDataUser(res.data.result);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 4,
            },
        },
        {
            title: "Tên hiển thị",
            dataIndex: "chinese",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Email",
            dataIndex: "math",
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: "Phone",
            dataIndex: "english",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];

    const data = dataUser
        .filter((item) => {
            if (searchName.length > 0) {
                return searchName.toLowerCase() === "" ? item : item.fullName.toLowerCase().includes(searchName);
            }
            if (searchEmail.length > 0) {
                return searchEmail.toLowerCase() === "" ? item : item.email.toLowerCase().includes(searchEmail);
            }
            if (searchPhone.length > 0) {
                return searchPhone.toLowerCase() === "" ? item : item.phone.toLowerCase().includes(searchPhone);
            }
            return item;
        })
        .map((user, index) => {
            return {
                key: index,
                name: user._id,
                chinese: user.fullName,
                math: user.email,
                english: user.phone,
            };
        });

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };
    return (
        <div className="user__wrap">
            <form className="user__input">
                <div className="width_input">
                    <span>Name</span>
                    <Input onChange={(e) => setSearchName(e.target.value)} placeholder="Name..." />
                </div>

                <div className="width_input">
                    <span>Email</span>
                    <Input onChange={(e) => setSearchEmail(e.target.value)} placeholder="Email..." />
                </div>

                <div className="width_input">
                    <span>Phone</span>
                    <Input onChange={(e) => setSearchPhone(e.target.value)} type="number" placeholder="Phone..." />
                </div>
            </form>
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{
                    defaultPageSize: page,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 8, 10, 20, 40, 60, 80, 100],
                }}
            />
        </div>
    );
}

export default User;
