import React from "react";
import { Navbar, Nav, NavDropdown, Container, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { DropdownMenu } from "../DropdownMenu";
import { AddSemesterButton } from "../../semesters/AddSemesterButton";
import { DeleteSemesterButton } from "../../semesters/DeleteSemesterButton";
import { ClearAllSemesterButton } from "../../semesters/ClearAllSemesterButton";
import { ExportPlan } from "../ExportPlan";
import { HowToDisplay } from "../howto/howtodisplay";
import { PreReqToggleButton } from "../PreReqToggleButton";


export const CourseSchedulerNavbar = (): JSX.Element => {

    return(

        <Navbar bg="light" data-testid="navbar" expand="lg" >
            <Container>
                <Navbar.Brand href="#home">UDCIS Course Scheduler</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown data-testid="navbardropdown" id="basic-navbar-nav" title="Useful Links" >
                            <NavDropdown.Item data-testid="navdropdownitem1" href="https://udapps.nss.udel.edu/CoursesSearch/" >Course Search</NavDropdown.Item>
                            <NavDropdown.Item data-testid="navdropdownitem2" href="https://www.cis.udel.edu/academics/undergraduate-programs/resources/courses/" >CISC Undergraduate Courses</NavDropdown.Item>
                            <NavDropdown.Item data-testid="navdropdownitem3" href="https://webreg.nss.udel.edu/registration/schedule/" >Registration Add/Drop</NavDropdown.Item>
                            <NavDropdown.Item data-testid="navdropdownitem4" href="https://ud-cis-teaching.github.io/student-guidance/" >UD CIS Student Guidance</NavDropdown.Item>
                        </NavDropdown>
                        <DropdownMenu/>
                        <ButtonToolbar>
                            <ButtonGroup className="me-2" aria-label="add semester button">
                                <AddSemesterButton/>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="delete semester button">
                                <DeleteSemesterButton/>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="clear all semester button">
                                <ClearAllSemesterButton/>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="export csv plan">
                                <ExportPlan/>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="how to display button">
                                <HowToDisplay/>
                            </ButtonGroup>
                            <PreReqToggleButton />
                        </ButtonToolbar>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
