import { useEffect, useState } from "react";
import "../Page.scss";
import { Form, Col, Row, Checkbox, Button, Rate, Tabs, Pagination, InputNumber, Drawer, Space } from "antd";
import { callFetchCategory, getListBooks } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { ArrowUpOutlined, ArrowDownOutlined, FilterOutlined } from "@ant-design/icons";
function Home() {
    const [category, setCategory] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(window.innerWidth <= 1023 ? 6 : 5);
    const [totalPaginate, setTotalPaginate] = useState([]);
    const [dataBook, setDataBook] = useState([]);
    const [query, setQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState([]);
    const [rangeSmall, setRangeSmall] = useState("");
    const [rangeLarge, setRangeLarge] = useState("");
    const [applyPrice, setApplyPrice] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const showDefaultDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        apiCategoryBook();
        apiListBooksPaginate();
    }, [current, pageSize, query, filterCategory, applyPrice]);

    const items = [
        {
            key: "sort=-sold",
            label: "Popular",
            children: <></>,
        },
        {
            key: "sort=-updatedAt",
            label: "New products",
            children: <></>,
        },
        {
            key: "sort=price",
            label: (
                <div style={{ display: "flex", gap: "10px" }}>
                    <span>Price</span>
                    <ArrowUpOutlined />
                </div>
            ),
            children: <></>,
        },
        {
            key: "sort=-price",
            label: (
                <div style={{ display: "flex", gap: "10px" }}>
                    <span>Price</span>
                    <ArrowDownOutlined />
                </div>
            ),
            children: <></>,
        },
    ];

    const apiCategoryBook = async () => {
        const res = await callFetchCategory();
        if (res && res.data) {
            setCategory(res.data);
        }
    };

    const onChange = (pages, pageSizes) => {
        if (pages !== current) {
            setCurrent(pages);
        }
        if (pageSizes !== pageSize) {
            setPageSize(pageSizes);
            setCurrent(1);
        }
    };

    const handleCategory = (list) => {
        if (list.length > 0) {
            setFilterCategory(list);
        } else {
            setFilterCategory("");
        }
    };
    const apiListBooksPaginate = async () => {
        let sortQuery = `${current}&pageSize=${pageSize}`;
        if (query) {
            sortQuery = sortQuery + "&" + query;
        }
        if (filterCategory) {
            sortQuery = sortQuery + "&category=" + filterCategory;
        }
        if (applyPrice.rangeSmall > 0 && applyPrice.rangeLarge > 0) {
            sortQuery = sortQuery + `&price>${applyPrice.rangeSmall}&price<${applyPrice.rangeLarge}`;
        }
        const res = await getListBooks(sortQuery);

        if (res && res.data) {
            setDataBook(res.data.result);
            setTotalPaginate(res.data.meta.total);
        }
    };
    const options = category.map((item) => {
        return {
            label: item,
            value: item,
        };
    });
    const handleApply = () => {
        const apply = {
            rangeSmall: rangeSmall,
            rangeLarge: rangeLarge,
        };
        setApplyPrice(apply);
        setOpen(false);
    };
    function slugify(string) {
        const a = "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
        const b = "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
        const p = new RegExp(a.split("").join("|"), "g");
        return string
            .toString()
            .toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
            .replace(/đ/gi, "d")
            .replace(/\s+/g, "-")
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            .replace(/&/g, "-and-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }
    const handleViewBook = (data) => {
        const slug = slugify(data.mainText);
        navigate(`book/${slug}?id=${data._id}`);
    };
    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND";
    }

    return (
        <div className="home__wrap">
            <Form>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={0} xl={4}>
                        <div className="home__nav">
                            <span>Bộ lọc tìm kiếm</span>
                            <span>Danh mục sản phẩm</span>
                            <div>
                                <Checkbox.Group
                                    className="home__check"
                                    onChange={handleCategory}
                                    options={options}
                                ></Checkbox.Group>
                            </div>
                            <div className="wrap__input">
                                <InputNumber
                                    type="number"
                                    defaultValue={0}
                                    onChange={(value) => setRangeSmall(value)}
                                />
                                <span> - </span>

                                <InputNumber
                                    type="number"
                                    defaultValue={0}
                                    onChange={(value) => setRangeLarge(value)}
                                />
                            </div>

                            <Button onClick={handleApply} style={{ marginTop: 10 }} type="primary">
                                Apply
                            </Button>
                            <div>
                                <span>Evaluate</span>
                                <br />
                                <Rate style={{ fontSize: "1.2rem" }} defaultValue={5} />
                                <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={4} />
                                <span className="ant-rate-text">Above</span>
                                <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={3} />
                                <span className="ant-rate-text">Above</span>
                                <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={2} />
                                <span className="ant-rate-text">Above</span>
                                <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={1} />
                                <span className="ant-rate-text">Above</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={20}>
                        <div className="home__content">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingBottom: "10px",
                                }}
                            >
                                <Tabs
                                    onChange={(value) => setQuery(value)}
                                    size="medium"
                                    defaultActiveKey="1"
                                    items={items}
                                />
                                <a onClick={showDefaultDrawer} href="#!">
                                    Lọc <FilterOutlined />
                                </a>
                            </div>
                            <div className="content__wrap">
                                {dataBook.length > 0 &&
                                    dataBook.map((data) => {
                                        return (
                                            <div
                                                onClick={() => handleViewBook(data)}
                                                key={data._id}
                                                className="content__item"
                                            >
                                                <img
                                                    className="content__image"
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                                                        data.thumbnail
                                                    }`}
                                                    alt="books"
                                                />
                                                <span className="content__text">{data.mainText}</span>
                                                <span style={{ width: "100%" }}>{currencyFormat(+data.price)} VND</span>
                                                <div className="wrap__rate">
                                                    <Rate
                                                        style={{
                                                            fontSize: "10px",
                                                        }}
                                                        allowClear={false}
                                                        defaultValue={5}
                                                    />
                                                    <span className="ant-rate-text">Sold {data.sold}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            <Pagination
                                style={{ textAlign: "center", marginTop: 20 }}
                                total={totalPaginate}
                                responsive
                                pageSize={pageSize}
                                onChange={(page, pageSize) => onChange(page, pageSize)}
                                showSizeChanger={true}
                                pageSizeOptions={[5, 10, 20, 40, 60, 80, 100]}
                            />
                        </div>
                    </Col>
                </Row>
            </Form>

            <Drawer
                title={`Filter`}
                placement="right"
                width={"70%"}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div className="home__nav">
                    <span>Bộ lọc tìm kiếm</span>
                    <span>Danh mục sản phẩm</span>
                    <div>
                        <Checkbox.Group
                            className="home__check"
                            onChange={handleCategory}
                            options={options}
                        ></Checkbox.Group>
                    </div>
                    <div className="wrap__input">
                        <InputNumber type="number" defaultValue={0} onChange={(value) => setRangeSmall(value)} />
                        <span> - </span>

                        <InputNumber type="number" defaultValue={0} onChange={(value) => setRangeLarge(value)} />
                    </div>

                    <Button onClick={handleApply} style={{ marginTop: 10 }} type="primary">
                        Apply
                    </Button>
                    <br />
                    <br />
                    <div>
                        <span>Evaluate</span>
                        <br />
                        <Rate style={{ fontSize: "1.2rem" }} defaultValue={5} />
                        <br />
                        <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={4} />
                        <span className="ant-rate-text">Above</span>
                        <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={3} />
                        <span className="ant-rate-text">Above</span>
                        <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={2} />
                        <span className="ant-rate-text">Above</span>
                        <Rate style={{ fontSize: "1.2rem" }} allowClear={false} defaultValue={1} />
                        <span className="ant-rate-text">Above</span>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Home;
