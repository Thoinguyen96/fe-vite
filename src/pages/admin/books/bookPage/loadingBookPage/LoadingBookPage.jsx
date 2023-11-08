import { Col, Row, Skeleton } from "antd";
function LoadingBookPage() {
    return (
        <>
            <div style={{ width: "100%", padding: "10px" }}>
                <Row className="row__loading" gutter={[20, 20]}>
                    <Col style={{ width: "100%" }} xs={24} md={24} lg={24} xl={24}>
                        <Skeleton.Input block active style={{ height: 350 }} />

                        <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
                            <Skeleton.Image active />
                            <Skeleton.Image active />
                            <Skeleton.Image active />
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={24} xl={24}>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default LoadingBookPage;
