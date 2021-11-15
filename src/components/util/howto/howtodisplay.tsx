import "bootswatch/dist/lux/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

export const HowToDisplay = () => {

    const [show,
        setShow] = useState<boolean>(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    return (

        <>
            <Button onClick={handleShow} variant="outline-success">
                How To
            </Button>
            <Modal onHide={handleClose} show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        How to use our app!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is a display!
                    You will notice
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-danger">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );

};
