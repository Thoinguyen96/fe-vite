import { Table, Input, Pagination } from "antd";
import { getPaginateUser } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
function User() {
    const [totalUser, setTotalUser] = useState(1);
    const [page, setPage] = useState(1);
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        fetchPaginateUser();
    }, []);
    const fetchPaginateUser = async () => {
        const res = await getPaginateUser();
        if (res && res.data) {
            setTotalUser(res.data.meta.total);
            setPage(res.data.meta.pages);
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
    const data = dataUser.map((user, index) => {
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
                    <Input placeholder="Name..." />
                </div>

                <div className="width_input">
                    <span>Email</span>
                    <Input placeholder="Email..." />
                </div>

                <div className="width_input">
                    <span>Phone</span>
                    <Input type="number" placeholder="Phone..." />
                </div>
            </form>
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{
                    defaultPageSize: 2,
                    showSizeChanger: true,
                    pageSizeOptions: [2, 4, 6, 8, 10, 20, 40, 60, 80, 100],
                }}
            />
        </div>
    );
}

export default User;
