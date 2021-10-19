import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { SemesterTable } from "./SemesterTable";
import {DropdownMenu} from "./DropdownMenu";
import React, {useState} from "react";
import { DisplayCourseList } from "./DisplayCourseList";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { CourseContext } from "../context/CourseContext";
import { Course } from "../interfaces/course";
import COURSES from "../json/courses.json";
import { DropResult } from "react-beautiful-dnd";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [courses, setCourses] = useState<Course[]>(COURSES as Course[]);
    const [selectedCourses, setSelectedCourses] = useState<string>("");
    const [deletedCourses, setDeletedCourses] = useState<Course[]>([]);

    const onDelete = (name: string) => {
        const ind = courses.map((e: Course, i: number) => e.name === name ? i : -1).filter(e => e !== -1)[0];
        const theCourses = courses;
        const course = theCourses.splice(ind, 1)[0];
        const delCourses = [...deletedCourses, course];
        setDeletedCourses(delCourses);
        setCourses(theCourses);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        console.log(result);
        const theCourses = courses;
        const theCourse = theCourses.splice(result.source.index, 1)[0];
        if (result.destination !== undefined) {
            theCourses.splice(result.destination?.index, 0, theCourse);
        }
        setCourses(theCourses);
    };

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
