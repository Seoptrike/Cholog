import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const ModalAddress = (props) => {
    const {setform, form} = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onComplet= (e) => {
        //console.log(e);
        const address = e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
        setform({...form, user_address1:address});
        handleClose();
    }
    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                검색
            </Button>

            <Modal
                style={{ top: '20%' }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>주소검색</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcodeEmbed onComplete={onComplet}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddress