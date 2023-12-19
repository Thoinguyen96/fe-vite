import { deleteBook, getListBooks } from "../../../services/ApiServices";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Descriptions, Table, Drawer, Space, Popconfirm, Image } from "antd";
// import UploadBook from "./uploadBook/UploadBook";
import BookModalCreate from "./uploadBook/bookModalCreate/BookModalCreate";
import ModalEditBook from "./modalEditbook/ModalEditBook";
import * as XLSX from "xlsx";
function Books() {
    const [dataBooks, setDataBooks] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [current, setCurrent] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState("");
    const [openInfoBooks, setOpenInfoBooks] = useState(false);
    const [dataInfoBooks, setDataInfoBooks] = useState([]);
    const [dataEditBook, setDataEditBook] = useState([]);

    const [isModalUploadBook, setIsModalUploadBook] = useState(false);
    const [isModalEditBook, setIsModalEditBook] = useState(false);

    const ExportFileBooks = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataBooks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ExportBooks.xlsx");
    };

    useEffect(() => {
        fetchPaginateBooks();
    }, []);

    const fetchPaginateBooks = async () => {
        const res = await getListBooks(current, pageSize);
        if (res && res.data) {
            setDataBooks(res.data);
            setPageSize(pageSize);
            setCurrent(current);
        }
    };
    const handleEditBook = (data) => {
        setIsModalEditBook(true);
        setDataEditBook(data);
    };
    const handleDelete = async (id) => {
        const res = await deleteBook(id);
        if (res.statusCode === 200) {
            fetchPaginateBooks();
            message.success({
                type: "success",
                content: "Delete success",
            });
        } else {
            message.error(res.message);
        }
    };
    const handleInfoBooks = (record) => {
        console.log(record);
        setOpenInfoBooks(true);
        setDataInfoBooks(record);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text, record) => {
                return (
                    <a onClick={() => handleInfoBooks(record)} href="#!">
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Book name",
            dataIndex: "mainText",
            sorter: (a, b) => a.mainText.localeCompare(b.mainText),
        },
        {
            title: "Category",
            dataIndex: "category",
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: "Author",
            dataIndex: "author",
            sorter: (a, b) => a.author.localeCompare(b.author),
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Date update",
            dataIndex: "updatedAt",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
        },
        {
            title: "Action",
            render: function (text, record) {
                return (
                    <div style={{ display: "flex", gap: 30 }}>
                        <EditOutlined
                            onClick={() => handleEditBook(record)}
                            style={{ color: "orange", cursor: "pointer", float: "left" }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            cancelText="No"
                            okText="Yes"
                            onConfirm={() => handleDelete(record._id)}
                            placement="topLeft"
                        >
                            <div style={{ display: "flex", gap: 30 }}>
                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                            </div>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    const data = dataBooks.filter((item) => {
        if (searchName.length > 0) {
            return item.mainText.toLowerCase().includes(searchName);
        }
        if (searchAuthor.length > 0) {
            return item.author.toLowerCase().includes(searchAuthor);
        }
        if (searchCategory.length > 0) {
            return item.category.toLowerCase().includes(searchCategory);
        }
        return item;
    });
    const onChange = (pagination, filters, sorter, extra) => {
        setPageSize(pagination.pageSize);
        setPage(pagination.total);
        console.log("params", pagination, filters, sorter, extra);
    };

    const handleHeader = () => {
        return (
            <div style={{ display: "flex", gap: 30, justifyContent: "end" }}>
                <Button onClick={() => setIsModalUploadBook(true)} type="primary">
                    <UploadOutlined />
                    Create book
                </Button>
                <Button onClick={ExportFileBooks} type="primary">
                    <UploadOutlined />
                    Export book
                </Button>
            </div>
        );
    };
    const onClose = () => {
        setOpenInfoBooks(false);
    };
    const items = [
        {
            key: "1",
            label: "Name",
            children: dataInfoBooks.mainText,
        },
        {
            key: "2",
            label: "author",
            children: dataInfoBooks.author,
        },
        {
            key: "3",
            label: "ID",
            children: dataInfoBooks._id,
        },

        {
            key: "4",
            label: "price",
            span: 2,
            children: dataInfoBooks.price,
        },
        {
            key: "5",
            label: "Date",
            children: dataInfoBooks.updatedAt,
        },
    ];

    return (
        <div className="user__wrap">
            <form className="user__input">
                <div className="width_input">
                    <span>Search name</span>
                    <Input onChange={(e) => setSearchName(e.target.value)} placeholder="Name..." />
                </div>

                <div className="width_input">
                    <span>Search category</span>
                    <Input onChange={(e) => setSearchCategory(e.target.value)} placeholder="category..." />
                </div>
                <div className="width_input">
                    <span>Search author</span>
                    <Input onChange={(e) => setSearchAuthor(e.target.value)} placeholder="Author..." />
                </div>
            </form>
            <Table
                title={handleHeader}
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
            <Drawer
                title="Info Books"
                placement="right"
                width="736"
                onClose={onClose}
                open={openInfoBooks}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div style={{ display: "flex", gap: 30 }}>
                    <Image
                        width={150}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/` + dataInfoBooks.thumbnail}
                    />
                    {dataInfoBooks.slider &&
                        dataInfoBooks.slider.length > 0 &&
                        dataInfoBooks.slider.map((image) => {
                            console.log(image);
                            return (
                                <>
                                    <Image
                                        width={150}
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/` + image}
                                    />
                                </>
                            );
                        })}
                </div>
                <br />
                <br />
                <Descriptions bordered layout="vertical" items={items} />
                <br />
                <div className="wrap_action">
                    <Button type="primary">Update</Button>
                </div>
            </Drawer>
            {/* <UploadBook isModalUploadBook={isModalUploadBook} setIsModalUploadBook={setIsModalUploadBook} /> */}
            <BookModalCreate
                setIsModalUploadBook={setIsModalUploadBook}
                isModalUploadBook={isModalUploadBook}
                fetchPaginateBooks={fetchPaginateBooks}
            />
            <ModalEditBook
                setIsModalEditBook={setIsModalEditBook}
                isModalEditBook={isModalEditBook}
                dataEditBook={dataEditBook}
                fetchPaginateBooks={fetchPaginateBooks}
            />
        </div>
    );
}

export default Books;
