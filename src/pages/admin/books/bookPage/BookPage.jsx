import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Col, Form, InputNumber, Rate, Row } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalBookPage from "../modalBookPage/ModalBookPage";
import { useRef } from "react";
import LoadingBookPage from "./loadingBookPage/LoadingBookPage";
import { getPageBookById } from "../../../../services/ApiServices";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import stylesheet if you're not already using CSS @import
function BookPage() {
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState("");
    const [data, setData] = useState([]);
    const [loadingBook, setLoadingBook] = useState(false);
    let location = useLocation();
    const id = location.search.slice(4);
    console.log(data);

    const handlePreviewImageBook = () => {
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
        setIsModalOpen(true);
    };
    useEffect(() => {
        fetListBook();
    }, []);
    const fetListBook = async () => {
        setLoadingBook(true);
        const res = await getPageBookById(id);
        if (res && res.data) {
            setTimeout(() => {
                // setLoadingBook(false);
            }, [3000]);

            setData(res.data);
            console.log(res);
        }
    };
    const refGallery = useRef(null);
    const images = [
        {
            original: `http://localhost:8080/images/book/${data.thumbnail}`,
            thumbnail: `http://localhost:8080/images/book/${data.thumbnail}`,
        },
    ];

    const handleUp = () => {
        if (step >= 1) {
            setStep(step + 1);
        }
        return;
    };
    const handleDown = () => {
        if (step > 1) {
            setStep(step - 1);
        }
        return;
    };
    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND";
    }
    return (
        <Form>
            <Row>
                {loadingBook === true ? (
                    <Col xs={24} md={24} lg={24} xl={24} className="col__loading">
                        <LoadingBookPage />
                    </Col>
                ) : (
                    <Col xs={24} md={24} lg={24} xl={24}>
                        <div className="book__wrap">
                            <Col xs={24} md={24} lg={11} xl={10}>
                                <ImageGallery
                                    ref={refGallery}
                                    renderLeftNav={() => <></>}
                                    renderRightNav={() => <></>}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    items={images}
                                    onClick={handlePreviewImageBook}
                                />
                            </Col>

                            <Col xs={24} md={24} lg={12} xl={10}>
                                <div className="book__wrap-content">
                                    <span>Author: {data.author}</span>
                                    <h3 className="book__title">{data.mainText}</h3>
                                    <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
                                        <Rate style={{ fontSize: 15, display: "flex" }} value={5} />
                                        <span className="book__sold"> sold: {data.sold}</span>
                                    </div>
                                    <span style={{ fontSize: "3.3rem", color: "orange" }}>
                                        {currencyFormat(+data.price)}{" "}
                                    </span>
                                    <div className="transport">
                                        <span>Transport:</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="quantity">
                                        <MinusOutlined onClick={handleDown} className="down" />

                                        <InputNumber
                                            value={step}
                                            style={{
                                                width: 40,
                                            }}
                                            controls={false}
                                            defaultValue={1}
                                        />
                                        <PlusOutlined onClick={handleUp} className="up" />
                                    </div>
                                    <div className="cart__wrap">
                                        <span className="cart">Add cart</span>
                                        <span className="buy">Buy now</span>
                                    </div>
                                </div>
                            </Col>
                        </div>

                        <ModalBookPage
                            images={images}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            currentIndex={currentIndex}
                        />
                    </Col>
                )}
            </Row>
        </Form>
    );
}

export default BookPage;
