import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { SemesterTable } from "./SemesterTable";
import {DropdownMenu} from "./DropdownMenu";
import React from "react";

export const MainPage = (): JSX.Element => {

    return(
        <Container>
            <Row>
                <Col>
                    Course Scheduler
                </Col>
                <Col>
                    <Row>
                        <DropdownMenu></DropdownMenu>
                    </Row>
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
