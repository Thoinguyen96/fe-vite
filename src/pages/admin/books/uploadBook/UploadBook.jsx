import { Button, Modal, Input, InputNumber, Select } from "antd";
import UploadThumbnail from "./uploadThumbnail/UploadThumbnail";
import UploadSlider from "./uploadSlider/UploadSlider";
import { PlusCircleOutlined } from "@ant-design/icons";
function UploadBook(props) {
    const { setIsModalUploadBook, isModalUploadBook } = props;

    const handleOk = () => {
        setIsModalUploadBook(false);
    };
    const handleCancel = () => {
        setIsModalUploadBook(false);
    };

    const onChange = (value) => {
        console.log("changed", value);
    };
    return (
        <>
            <Modal
                maskClosable={false}
                title="Add new Book"
                open={isModalUploadBook}
                onOk={handleOk}
                onCancel={handleCancel}
                width={"60%"}
            >
                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Name Book</span>
                        <Input placeholder="Name Book" />
                    </div>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Author</span>
                        <Input placeholder="Author" />
                    </div>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Price</span>
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            addonAfter="$ USD"
                            defaultValue={""}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Category</span>
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? "").includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                                {
                                    value: "4",
                                    label: "Identified",
                                },
                                {
                                    value: "5",
                                    label: "Resolved",
                                },
                                {
                                    value: "6",
                                    label: "Cancelled",
                                },
                            ]}
                        />
                        {/* <InputNumber
                            style={{
                                width: "100%",
                            }}
                            addonAfter={selectAfter}
                            defaultValue={""}
                        /> */}
                    </div>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Quantity</span>
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            min={1}
                            max={10}
                            defaultValue={""}
                            onChange={onChange}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <PlusCircleOutlined style={{ color: "green" }} /> <span>Sold</span>
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            min={1}
                            max={10}
                            defaultValue={""}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <br />
                <br />
                <div style={{ display: "flex", gap: 10 }}>
                    <div
                        style={{
                            width: "100%",
                        }}
                    >
                        <span>Thumbnail image</span>
                        <UploadThumbnail />
                    </div>

                    <div
                        style={{
                            width: "100%",
                        }}
                    >
                        <span>Slider image</span>
                        <UploadSlider />
                    </div>
                </div>
            </Modal>
        </>
    );
}
export default UploadBook;
