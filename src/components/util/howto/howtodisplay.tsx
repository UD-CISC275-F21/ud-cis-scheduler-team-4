import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import React, { useState } from "react";
import { HowToDropDown } from "./howtodropdown/howtodropdown";
import { HandleHowToDisplay } from "./howtodropdown/howtodropdownlogic";

export const HowToDisplay = (): JSX.Element => {

    const [show,
        setShow] = useState<boolean>(false);
    const handleShow = () => {
        setShow(true);
    };
    const [currDisplay,
        setCurrDisplay] = useState<number>(0);
    const handleClose = () => {
        setCurrDisplay(0);
        setShow(false);
    };

    return (

        <>
            <Button onClick={handleShow}
                variant="outline-success"
                data-testid="howtobutton">
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
