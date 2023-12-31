import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Col, Form, InputNumber, Rate, Row, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalBookPage from "../modalBookPage/ModalBookPage";
import { useRef } from "react";
import LoadingBookPage from "./loadingBookPage/LoadingBookPage";
import { getPageBookById } from "../../../../services/ApiServices";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doAddCart } from "../../../../redux/orderSlice/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
// import stylesheet if you're not already using CSS @import
function BookPage() {
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState("");
    const [data, setData] = useState([]);
    const [loadingBook, setLoadingBook] = useState(false);
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authentically = useSelector((state) => state.account.authentically);
    var urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");

    useEffect(() => {
        fetListBook();
    }, []);

    const fetListBook = async () => {
        setLoadingBook(true);
        const res = await getPageBookById(id);
        if (res && res.data) {
            setData(res.data);
        }
    };
    console.log(data.thumbnail);
    const handlePreviewImageBook = () => {
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
        setIsModalOpen(true);
    };
    const refGallery = useRef(null);
    let images = [];
    if (data.thumbnail) {
        images.push({
            original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
            thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
        });
    }
    if (data.slider) {
        data?.slider.map((item) => {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
            });
        });
    }

    const handleUp = () => {
        if (step >= 1 && step < +data.quantity) {
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
    const handleValueCart = (e) => {
        if (e <= data.quantity) {
            setStep(e);
        } else {
            message.error("Available Quantity " + data.quantity);
        }
    };
    const handleAddCart = () => {
        if (authentically === true) {
            dispatch(doAddCart({ quantity: step, _id: data._id, detail: data }));
        } else {
            navigate("/login");
        }
    };

    return (
        <Form>
            <Row>
                {loadingBook === false ? (
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
                                        <span className="book__sold"> sold: </span>
                                        <span style={{ color: "red", fontWeight: "bold" }}>{data.sold}</span>
                                    </div>
                                    <span style={{ fontSize: "3.3rem", color: "orange" }}>
                                        {currencyFormat(+data.price)}{" "}
                                    </span>
                                    <div className="transport">
                                        <span>Transport:</span>
                                        <span style={{ color: "red", fontWeight: "bold" }}>Free</span>
                                    </div>
                                    <span style={{ fontSize: "1.5rem" }}>Available Quantity: </span>
                                    <span style={{ color: "red", fontWeight: "bold" }}> {data.quantity}</span>

                                    <div className="quantity">
                                        <MinusOutlined onClick={handleDown} className="down" />

                                        <InputNumber
                                            type="number"
                                            value={step}
                                            style={{
                                                minWidth: 40,
                                            }}
                                            controls={false}
                                            onChange={(e) => handleValueCart(e)}
                                        />
                                        <PlusOutlined onClick={handleUp} className="up" />
                                    </div>
                                    <div className="cart__wrap">
                                        <span onClick={handleAddCart} className="cart">
                                            Add cart
                                        </span>
                                        <span onClick={() => navigate("/order")} className="buy">
                                            Buy now
                                        </span>
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
