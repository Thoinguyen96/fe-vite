import { deleteUser, editUser, getPaginateUser } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
import InfoUser from "./infoUser/InfoUser";
import { DeleteOutlined, EditOutlined, UserAddOutlined, UploadOutlined, ExportOutlined } from "@ant-design/icons";
import ModalCreateUser from "./modalCreateUser/ModalCreateUser";
import ModalUpload from "./modalUpload/ModalUpload";
import * as XLSX from "xlsx/xlsx.mjs";
import { Button, Input, Modal, message, Table, Popconfirm } from "antd";

function User() {
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPage, setTotalPage] = useState([]);
    const [infoUser, setInfoUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalUpload, setIsModalUpload] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [sortQueryEmail, setSortQueryEmail] = useState("");
    const [sortQueryName, setSortQueryName] = useState("");
    const [sortQueryPhone, setSortQueryPhone] = useState("");

    useEffect(() => {
        fetchPaginateUser();
    }, [current, pageSize, sortQueryEmail, sortQueryPhone, sortQueryName]);
    const showModalCreateUser = () => {
        setIsModalCreateOpen(true);
    };
    const fetchPaginateUser = async () => {
        let query = `current=${current}&pageSize=${pageSize}`;
        if (sortQueryEmail) {
            query = query + `&email=/${sortQueryEmail}/i`;
        }
        if (sortQueryName) {
            query = query + `&fullName=/${sortQueryName}/i`;
        }
        if (sortQueryPhone) {
            query = query + `&phone=/${sortQueryPhone}/i`;
        }

        const res = await getPaginateUser(query + `&sort=-updatedAt`);
        if (res && res.data) {
            setDataUser(res.data.result);
            setTotalPage(res.data.meta.total);
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
            render: function (text, record) {
                return (
                    <div style={{ display: "flex", gap: 30 }}>
                        <EditOutlined onClick={() => handleEdit(record)} style={{ color: "red", cursor: "pointer" }} />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            cancelText="No"
                            okText="Yes"
                            onConfirm={() => handleDelete(record._id)}
                            placement="topLeft"
                        >
                            <div style={{ display: "flex", gap: 30 }}>
                                <DeleteOutlined style={{ color: "orange", cursor: "pointer" }} />
                            </div>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    const onChange = (pagination) => {
        console.log(pagination);
        if (pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.current !== pageSize) {
            setPageSize(pagination.pageSize);
        }
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
                    <Input onChange={(e) => setSortQueryName(e.target.value)} placeholder="Name..." />
                </div>

                <div className="width_input">
                    <span>Email</span>
                    <Input onChange={(e) => setSortQueryEmail(e.target.value)} placeholder="Email..." />
                </div>

                <div className="width_input">
                    <span>Phone</span>
                    <Input onChange={(e) => setSortQueryPhone(e.target.value)} type="number" placeholder="Phone..." />
                </div>
            </form>
            <Table
                title={() => handleHeader()}
                rowKey="_id"
                columns={columns}
                dataSource={dataUser}
                onChange={onChange}
                pagination={{
                    pageSize: pageSize,
                    total: totalPage,
                    current: current,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 40, 60, 80, 100],
                }}
            />
            <InfoUser open={open} setOpen={setOpen} infoUser={infoUser} setInfoUser={setInfoUser} />
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
