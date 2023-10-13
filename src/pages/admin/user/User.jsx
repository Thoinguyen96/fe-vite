import { Table, Input, Button, message } from "antd";
import { deleteUser, getPaginateUser } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
import InfoUser from "./infoUser/InfoUser";
import { DeleteOutlined } from "@ant-design/icons";
import ModalCreateUser from "./modalCreateUser/ModalCreateUser";
function User() {
    const [dataUser, setDataUser] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [current, setCurrent] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState("");
    const [infoUser, setInfoUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    useEffect(() => {
        fetchPaginateUser();
    }, []);
    const showModalCreateUser = () => {
        setIsModalCreateOpen(true);
    };
    const fetchPaginateUser = async () => {
        const res = await getPaginateUser(current, pageSize);
        if (res && res.data) {
            setDataUser(res.data);
            setPageSize(pageSize);
            setCurrent(current);
        }
    };
    const showLargeDrawer = (record) => {
        setOpen(true);
        setInfoUser(record);
    };
    const handleDelete = async (id) => {
        const res = await deleteUser(id);
        console.log();
        if (res.statusCode === 200) {
            fetchPaginateUser();
            message.success({
                type: "success",
                content: "Delete success",
            });
        } else {
            message.error(res.message);
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <a onClick={() => showLargeDrawer(record)} href="#!">
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: "Action",
            render: function (text, record, index) {
                return (
                    <DeleteOutlined
                        onClick={() => handleDelete(record._id)}
                        style={{ color: "red", cursor: "pointer" }}
                    />
                );
            },
        },
    ];

    const data = dataUser.filter((item) => {
        if (searchName.length > 0) {
            return item.fullName.toLowerCase().includes(searchName);
        }
        if (searchEmail.length > 0) {
            return item.email.toLowerCase().includes(searchEmail);
        }
        if (searchPhone.length > 0) {
            return item.phone.toLowerCase().includes(searchPhone);
        }
        return item;
    });
    // .map((user, index) => {
    //     return {
    //         key: index,
    //         name: user._id,
    //         chinese: user.fullName,
    //         math: user.email,
    //         english: user.phone,
    //     };
    // });
    const onChange = (pagination, filters, sorter, extra) => {
        setPageSize(pagination.pageSize);
        setPage(pagination.total);
        console.log("params", pagination, filters, sorter, extra);
    };
    const handleHeader = () => {
        return (
            <div>
                <Button onClick={showModalCreateUser} type="primary">
                    Create user
                </Button>
            </div>
        );
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
                title={() => handleHeader()}
                rowKey="_id"
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{
                    pageSize: pageSize,
                    total: page,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 40, 60, 80, 100],
                }}
            />
            <InfoUser open={open} setOpen={setOpen} infoUser={infoUser} />
            <ModalCreateUser
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                fetchPaginateUser={fetchPaginateUser}
            />
        </div>
    );
}

export default User;
