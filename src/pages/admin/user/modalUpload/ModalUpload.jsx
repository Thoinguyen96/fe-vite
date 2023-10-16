import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Modal, Space, Table, Tag } from "antd";
import * as XLSX from "xlsx";
import { importDataUser } from "../../../../services/ApiServices";
const ModalUpload = (props) => {
    const { Dragger } = Upload;
    const { isModalUpload, setIsModalUpload } = props;
    const [dataExcel, setDataExcel] = useState([]);

    const propsUploading = {
        name: "file",
        multiple: true,
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                console.log(info.file);

                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);

                reader.onload = function (e) {
                    let data = new Uint8Array(reader.result);
                    let workbook = XLSX.read(data, { type: "array" });
                    // find the name of your sheet in the workbook first
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: ["fullName", "email", "phone"],
                        range: 1,
                    });

                    if (jsonData && jsonData.length > 0) {
                        setDataExcel(jsonData);
                    }
                };

                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const columns = [
        {
            title: "FullName",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
    ];
    const handleCancel = () => {
        setIsModalUpload(false);
    };

    const handleImport = async () => {
        const data = dataExcel.map((item) => {
            item.password = "123456";
            return item;
        });
        const res = await importDataUser(data);
        if (res && res.data) {
            console.log(res);
            message.success({
                type: "Success",
                content: (
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
                        <span>{"Success : " + res.data.countSuccess}</span>
                        <span>{"Error : " + res.data.countError}</span>
                    </div>
                ),
            });
            // message.success("Success  " + res.data.countSuccess + "Error  " + res.data.countError);
        } else {
            message.error("Error " + res.message);
        }
        console.log(res);
    };
    return (
        <>
            <Modal
                width="60%"
                title="Upload File"
                open={isModalUpload}
                onOk={handleImport}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: dataExcel.length < 1,
                }}
                maskClosable={false}
            >
                <Dragger {...propsUploading} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <Table
                    title={() => <span>Dữ liệu upload</span>}
                    width="100%"
                    columns={columns}
                    dataSource={dataExcel}
                    pagination={false}
                />
            </Modal>
        </>
    );
};
export default ModalUpload;
