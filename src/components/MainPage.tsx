import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { SemesterTable } from "./SemesterTable";
import {DropdownMenu} from "./DropdownMenu";
import React, {useState} from "react";
import { DisplayCourseList } from "./DisplayCourseList";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<string>("");

    return(
        <Container>
            <Row>
                <Col>
                    Course Scheduler
                </Col>
                <Col>
                    <Row>
                        <DropdownMenu concentration={concentration} setConcentration={setConcentration}></DropdownMenu>
                    </Row>
                    <Row>
                        <Col>
                            <DisplayCourseList concentration={concentration}></DisplayCourseList>
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
