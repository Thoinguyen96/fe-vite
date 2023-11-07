import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Modal } from "antd";
function ModalBookPage(props) {
    const { images, isModalOpen, setIsModalOpen, currentIndex } = props;

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                width={1000}
                title="Basic Modal"
                open={isModalOpen}
                slideDuration={0}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ImageGallery
                    startIndex={currentIndex}
                    thumbnailPosition="right"
                    showFullscreenButton={false}
                    showPlayButton={false}
                    items={images}
                />
            </Modal>
        </>
    );
}
export default ModalBookPage;
