import { useEffect, useState } from "react";
import "../Page.scss";
import { Form, Col, Row, Checkbox, Input, Button, Rate, Tabs, Pagination } from "antd";
import { callFetchCategory, getListBooks } from "../../services/ApiServices";
function Home() {
    const [category, setCategory] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPaginate, setTotalPaginate] = useState([]);
    const [dataBook, setDataBook] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        apiCategoryBook();
        apiListBooksPaginate();
    }, [current, pageSize, query]);
    // const dataPopular = dataBook
    //     .filter((item) => {
    //         return item;
    //     })
    //     .sort(function (a, b) {
    //         return b.sold - a.sold;
    //     });
    // const dataProductNew = dataBook
    //     .filter((item) => {
    //         return item;
    //     })
    //     .sort(function (a, b) {
    //         return a.updatedAt - b.updatedAt;
    //     });
    // const dataLowToHigh = dataBook
    //     .filter((item) => {
    //         return item;
    //     })
    //     .sort(function (a, b) {
    //         return a.price - b.price;
    //     });
    // const dataHeightToLow = dataBook
    //     .filter((item) => {
    //         return item;
    //     })
    //     .sort(function (a, b) {
    //         return b.price - a.price;
    //     });
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
            label: "Low to high price",
            children: <></>,
        },
        {
            key: "sort=-price",
            label: "Height to low price",
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
    const handleCategory = (e, item) => {
        const dataFilterCategory = dataBook.filter((fil) => {
            return fil.category === item.item;
        });
        if (dataFilterCategory.length > 0) {
            setDataBook(dataFilterCategory);
        }
        if (e === false) {
            apiListBooksPaginate();
        }
    };
    //
    const apiListBooksPaginate = async () => {
        let sortQuery = `${current}&pageSize=${pageSize}`;
        if (query) {
            sortQuery = sortQuery + "&" + query;
        }
        const res = await getListBooks(sortQuery);
        console.log(res);
        console.log(query);

        if (res && res.data) {
            setDataBook(res.data.result);
            setTotalPaginate(res.data.meta.total);
        }
    };
    return (
        <div className="home__wrap">
            <Form>
                <Row>
                    <Col span={4}>
                        <div className="home__nav">
                            <span>Bộ lọc tìm kiếm</span>
                            <span>Danh mục sản phẩm</span>
                            <div className="home__check">
                                {category.length > 0 &&
                                    category.map((item, index) => {
                                        return (
                                            <Checkbox
                                                onChange={(e) => handleCategory(e.target.checked, { item })}
                                                key={index}
                                            >
                                                {item}
                                            </Checkbox>
                                        );
                                    })}
                            </div>
                            <div className="wrap__input">
                                <Input placeholder="Input a number" maxLength={16} />
                                <span> - </span>
                                <Input placeholder="Input a number" maxLength={16} />
                            </div>
                            <Button style={{ marginTop: 10 }} type="primary">
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
                    <Col span={20}>
                        <div className="home__content">
                            <Tabs
                                onChange={(value) => setQuery(value)}
                                size="medium"
                                defaultActiveKey="1"
                                items={items}
                            />
                            <div style={{ display: "flex", gap: 10 }}>
                                {dataBook.length > 0 &&
                                    dataBook.map((data) => {
                                        return (
                                            <div key={data._id} className="content__item">
                                                <img
                                                    className="content__image"
                                                    src={`http://localhost:8080/images/book/${data.thumbnail}`}
                                                    alt="books"
                                                />
                                                <span className="content__text">{data.mainText}</span>
                                                <span style={{ width: "100%" }}>{data.price} VND</span>
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
        </div>
    );
}

export default Home;
