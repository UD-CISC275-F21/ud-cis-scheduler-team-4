import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { SemesterTable } from "./SemesterTable";
import React from "react";

export const MainPage = (): JSX.Element => {

    return(
        <Container>
            <Row>
                <Col>
                    
                </Col>
                <Col>
                    <Row>
                        <Col>
                            {/* concentration list */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* reqs */}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SemesterTable />
                </Col>
            </Row>
        </Container>
    );

};
