import { Col, Row, Skeleton } from "antd";
function LoadingBookPage() {
    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={11} xl={10}>
                    <Skeleton active />
                </Col>
            </Row>
        </>
    );
}

export default LoadingBookPage;
