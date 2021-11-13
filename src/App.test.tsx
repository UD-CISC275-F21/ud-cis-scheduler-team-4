import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {
    mockGetComputedStyle,
    mockDndSpacing,
    makeDnd,
    DND_DIRECTION_UP,
    DND_DIRECTION_DOWN,
    DND_DRAGGABLE_DATA_ATTR
  } from 'react-beautiful-dnd-test-utils';
import App from "./App";

/*

    Testing initial render elements

*/

test("renders UD CIS Scheduler text", () => {
    render(<App />);
    const linkElement = screen.getByText(/Course Scheduler/i);
    expect(linkElement).toBeInTheDocument();
});

test("renders Semester Table", () => {
    render(<App />);
    const semesterTableElement = screen.getByText(/Semester 1/i);
    expect(semesterTableElement).toBeInTheDocument();
});

test("renders concentration header", () => {

    render(<App />);
    const concentrationHeaderElem = screen.getByText(/Artificial Intelligence and Robotics/i);
    expect(concentrationHeaderElem).toBeInTheDocument();

});

test("renders nav bar", () => {

    render(<App />);
    const navBar = screen.getByTestId("navbar");
    expect(navBar).toBeInTheDocument();

});

describe("Testing useful links dropdown", () => {

    beforeEach(() => {
        render(<App />);
    });

    it("should display all links when useful links dropdown is pressed", async () => {

        const navBarDropDown = screen.getByTestId("navbardropdown");
        navBarDropDown.click();
        //const firstLink = screen.getByTestId("navdropdownitem1");
        //const secondLink = screen.getByTestId("navdropdownitem2");
        //const thirdLink = screen.getByTestId("navbardropdownitem3");
        //const fourthLink = screen.getByTestId("navbardropdownitem4");
        //expect(firstLink).toBeVisible();
        //expect(secondLink).toBeVisible();
        //expect(thirdLink).toBeVisible();
        //expect(fourthLink).toBeVisible();
    });
});

test("renders add semester button", () => {
    render(<App />);
    const addSemesterButton = screen.getByTestId("addsemesterbutton");
    expect(addSemesterButton).toBeInTheDocument();
});

test("renders course listgroup", () => {
    render(<App />);
    const courses = screen.getAllByTestId("courseitem");
    for(let c in courses){
        expect(courses[c]).toBeInTheDocument();
    }
});

/**
 * 
 * Testing button functionality
 * 
 */

test("add semester button renders a new semester", () => {
    render(<App />);
    const addSemesterButton = screen.getByTestId('addsemesterbutton');
    const firstSemesters = screen.getAllByText(/Semester/);
    addSemesterButton.click();
    const secondSemesters = screen.getAllByText(/Semester/);
    expect(secondSemesters.length).toBeGreaterThan(firstSemesters.length)
});

// This test doesn't consistently pass? Seems to be a problem with the testing-util package
describe("testing drag and drop features", ()=> {

    test("moves a task down inside a column", async () => {
        render(<App />);
    
        const courses = screen.getAllByTestId("courseitem");
    
        await makeDnd({
          getDragElement: () =>
            screen
              .getByText(/CISC108/)
              .closest(DND_DRAGGABLE_DATA_ATTR),
          direction: DND_DIRECTION_DOWN,
          positions: 2
        });
        const newCourses = screen.getAllByTestId("courseitem");
    
        //These shouldn't be equal because the courses should  now be in a different order
        expect(newCourses).not.toEqual(courses);
    });

});

describe("moving a course to semester table in order to test semester features", () => {
    test("inner semester table is rendered", () => {
        render(<App />);
        const semesterTable = screen.getByTestId("semestertable");
        expect(semesterTable).toBeInTheDocument();
    });

    //this test below is challenging

   /* test("can move course to semester table", () => {
        render(<App />);
        const semesterTable = screen.getByTestId("semestertable");
        const courses = screen.getAllByTestId("courseitem");
        const theCourse = courses[0];
        expect(semesterTable)
    });*/
});