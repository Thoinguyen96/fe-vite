import { deleteUser, editUser, getPaginateUser } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
import InfoUser from "./infoUser/InfoUser";
import { DeleteOutlined, EditOutlined, UserAddOutlined, UploadOutlined, ExportOutlined } from "@ant-design/icons";
import ModalCreateUser from "./modalCreateUser/ModalCreateUser";
import ModalUpload from "./modalUpload/ModalUpload";
import * as XLSX from "xlsx/xlsx.mjs";
import { Button, Input, Modal, message, Table } from "antd";

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
    const [isModalUpload, setIsModalUpload] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

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
    const handleEdit = async (record) => {
        setIsModalEdit(true);
        setEmail(record.email);
        setFullName(record.fullName);
        setPhone(record.phone);
        setDataEdit(record);
    };

    const submitEditUser = async () => {
        const res = await editUser(dataEdit._id, fullName, phone);
        if (res && res.data) {
            message.success("Update user success");
            fetchPaginateUser();
            setIsModalEdit(false);
        } else {
            message.error(res.message);
        }
        console.log(res);
    };
    const handleCancel = () => {
        setIsModalEdit(false);
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
                    <div style={{ display: "flex", gap: 30 }}>
                        <EditOutlined onClick={() => handleEdit(record)} style={{ color: "red", cursor: "pointer" }} />
                        <DeleteOutlined
                            onClick={() => handleDelete(record._id)}
                            style={{ color: "orange", cursor: "pointer" }}
                        />
                    </div>
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
    const onChange = (pagination, filters, sorter, extra) => {
        setPageSize(pagination.pageSize);
        setPage(pagination.total);
        console.log("params", pagination, filters, sorter, extra);
    };
    const ExportFile = () => {
        console.log(dataUser);
        const sheet = XLSX.utils.json_to_sheet(dataUser);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet 1");
        XLSX.writeFile(workbook, `sheet1.xls`);
    };

    const handleHeader = () => {
        return (
            <div style={{ display: "flex", gap: 30, justifyContent: "end" }}>
                <Button onClick={showModalCreateUser} type="primary">
                    <UserAddOutlined />
                    Create user
                </Button>
                <Button onClick={() => setIsModalUpload(true)} type="primary">
                    <UploadOutlined />
                    Upload file
                </Button>
                <Button onClick={ExportFile} type="primary">
                    <ExportOutlined />
                    Export File
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
            <ModalUpload isModalUpload={isModalUpload} setIsModalUpload={setIsModalUpload} />

            <Modal
                autoFocusButton={null}
                title="Update user"
                open={isModalEdit}
                onOk={submitEditUser}
                onCancel={handleCancel}
            >
                <br />
                <span>Full Name</span>
                <Input placeholder="full name..." onChange={(e) => setFullName(e.target.value)} value={fullName} />
                <br />
                <br />
                <span>Email</span>
                <Input disabled onChange={(e) => setEmail(e.target.value)} placeholder="email..." value={email} />
                <br />
                <br />
                <span>Phone</span>
                <Input type="number" onChange={(e) => setPhone(e.target.value)} placeholder="Phone..." value={phone} />
                <br />
                <br />
            </Modal>
        </div>
    );
}

export default User;
