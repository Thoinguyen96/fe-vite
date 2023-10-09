import { Table, Input, Pagination } from "antd";
function User() {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 4,
            },
        },
        {
            title: "Chinese Score",
            dataIndex: "chinese",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Math Score",
            dataIndex: "math",
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: "English Score",
            dataIndex: "english",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            key: "1",
            name: "John Brown",
            chinese: 98,
            math: 60,
            english: 70,
        },
    ];

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
            <Table columns={columns} dataSource={data} onChange={onChange} />
            <Pagination defaultCurrent={6} total={500} />
        </div>
    );
}

export default User;
