import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import React, { useState } from "react";
import { HowToDropDown } from "./howtodropdown/howtodropdown";
import { HandleHowToDisplay } from "./howtodropdown/howtodropdownlogic";

export const HowToDisplay = () => {

    const [show,
        setShow] = useState<boolean>(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const [currDisplay,
        setCurrDisplay] = useState<number>(0);

    return (

        <>
            <Button onClick={handleShow} variant="outline-success">
                How To
            </Button>
            <Modal onHide={handleClose} show={show}>
                <Modal.Header closeButton>
                    <Container>
                        <Row style={{ textAlign: "center" }}>
                            <Col>
                                <Modal.Title>
                                    How to use our app!
                                </Modal.Title>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row style={{ textAlign: "left" }}>
                            <Col>
                                <HowToDropDown setDisplay={setCurrDisplay} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                {HandleHowToDisplay(currDisplay)}
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-danger">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );

};
