import React, { useState } from "react";
import { Button, Drawer, Space, Descriptions } from "antd";
const InfoUser = (props) => {
    const { open, setOpen, infoUser } = props;
    const onClose = () => {
        setOpen(false);
    };
    const items = [
        {
            key: "1",
            label: "Full Name",
            children: infoUser.fullName,
        },
        {
            key: "2",
            label: "phone",
            children: infoUser.phone,
        },
        {
            key: "3",
            label: "ID",
            children: infoUser._id,
        },

        {
            key: "4",
            label: "Role",
            span: 2,
            children: infoUser.role,
        },
        {
            key: "5",
            label: "Date",
            children: infoUser.updatedAt,
        },
    ];
    const handleTitle = () => {
        return <h4>Info user</h4>;
    };
    return (
        <>
            <Drawer
                title={handleTitle()}
                placement="right"
                width="736"
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
                <div className="wrap__view-avatar">
                    <img className="view__avatar" src={infoUser.avatar} />
                </div>
                <br />
                <br />
                <Descriptions bordered layout="vertical" items={items} />
                <br />
                <div className="wrap_action">
                    <Button type="primary">Update</Button>
                </div>
            </Drawer>
        </>
    );
};
export default InfoUser;
