import { Col, Row, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getApiHistory } from "../../../services/ApiServices";
import ReactJson from "react-json-view";
function History() {
    const [dataHistory, setDataHistory] = useState([]);

    // console.log(dataRole);
    useEffect(() => {
        fetchHistory();
    }, []);
    const fetchHistory = async () => {
        const res = await getApiHistory();
        console.log(res);
        if (res && res.data) {
            setDataHistory(res.data);
        }
    };
    const columns = [
        {
            title: "Stt",
            dataIndex: "stt",
            key: "stt",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Total money",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "State",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

        {
            title: "About",
            key: "about",
            dataIndex: "about",
            render: (record) => {
                console.log(record);
                return <a>{<ReactJson collapsed={true} enableClipboard={false} src={record} />}</a>;
            },
        },
    ];
    const data = dataHistory.map((item, index) => {
        return {
            key: item._id,
            stt: +index + 1,
            date: new Date(item.updatedAt).toLocaleString(),
            // console.log(date.toLocaleDateString());
            // console.log(date.toLocaleString());
            // console.log(date.toLocaleTimeString());

            total: new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(item.totalPrice),
            tags: ["Success"],
            about: item,
        };
    });
    console.log(data);
    return (
        <div className="wrapper__oder-all">
            <Row>
                <Col xs={24} sm={24} md={24} xl={24}>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            color: "green",
                            alignContent: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h2>History cart for you</h2>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default History;
