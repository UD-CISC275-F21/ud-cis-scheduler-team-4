import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { SemesterTable } from "./SemesterTable";
import {DropdownMenu} from "./DropdownMenu";
import React, {useState} from "react";
import { DisplayCourseList } from "./DisplayCourseList";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);

    return(
        <Container>
            <Row>
                <Col>
                    Course Scheduler
                </Col>
                <Col>
                    <Row>
                        <DropdownMenu setConcentration={setConcentration}></DropdownMenu>
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
