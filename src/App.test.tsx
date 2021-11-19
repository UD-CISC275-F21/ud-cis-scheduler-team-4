import React from "react";
import { act, render, screen } from "@testing-library/react";
import {
    makeDnd,
    DND_DIRECTION_UP,
    DND_DIRECTION_DOWN,
    DND_DRAGGABLE_DATA_ATTR
} from "react-beautiful-dnd-test-utils";
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

test("renders delete semester button", () => {
    render(<App />);
    const deleteSemesterButton = screen.getByTestId("deletesemesterbutton");
    expect(deleteSemesterButton).toBeInTheDocument();
});

test("renders export csv button", () => {
    render(<App />);
    const exportCSV = screen.getByTestId("exportcsvbutton");
    expect(exportCSV).toBeInTheDocument();
});

test("renders how to button", () => {
    render(<App />);
    const howToButton = screen.getByTestId("howtobutton");
    expect(howToButton).toBeInTheDocument();
});

test("renders course listgroup", () => {
    render(<App />);
    const courses = screen.getAllByTestId("courseitem");
    for(const c in courses){
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
    const addSemesterButton = screen.getByTestId("addsemesterbutton");
    const initialSemesters = screen.getAllByText(/Semester/);
    act(() => {
        addSemesterButton.click();
    });
    const secondSemesters = screen.getAllByText(/Semester/);
    expect(secondSemesters.length).toBeGreaterThan(initialSemesters.length);
});

test("delete semester button removes a semester from the screen", () => {
    render(<App />);
    const addSemesterButton = screen.getByTestId("addsemesterbutton");
    const deleteSemesterButton = screen.getByTestId("deletesemesterbutton");
    act(() => {
        addSemesterButton.click();
    });
    const beforeDelete = screen.getAllByTestId("semesteraccordian");
    act(() => {
        deleteSemesterButton.click();
    });
    const afterDelete = screen.getAllByTestId("semesteraccordian");
    expect(beforeDelete.length).toBeGreaterThan(afterDelete.length);

});

// This test doesn't consistently pass? Seems to be a problem with the testing-util package
describe("testing drag and drop features", ()=> {

    test("moves a task down inside a column", async () => {
        render(<App />);
    
        const courses = screen.getAllByTestId("courseitem");

        screen.getByText(/CISC Core and Concentration/).click();
    
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

        const CISC108 = screen.getByText(/CISC108/);
        expect(newCourses[0]).not.toEqual(CISC108);
    });

    test("moves a task up inside a column", async () => {
        render(<App />);

        const courses = screen.getAllByTestId("courseitem");

        screen.getByText(/CISC Core and Concentration/).click();

        await makeDnd({
            getDragElement: () => 
                screen
                    .getByText(/CISC210/)
                    .closest(DND_DRAGGABLE_DATA_ATTR),
            direction: DND_DIRECTION_UP,
            positions: 2
        });
        const newCourses = screen.getAllByTestId("courseitem");
        expect(newCourses).not.toEqual(courses);

        const CISC210 = screen.getByText(/CISC210/);
        expect(newCourses[0]).toEqual(CISC210);
    });

});

describe("moving a course to semester table in order to test semester features", () => {
    test("inner semester table is rendered", () => {
        render(<App />);
        const semesterTable = screen.getByTestId("semestertable");
        expect(semesterTable).toBeInTheDocument();
    });

    //this test below is challenging me --- how can we simulate a course inside a semester without doing a drag/drop?

/* test("can move course to semester table", () => {
        render(<App />);
        const semesterTable = screen.getByTestId("semestertable");
        const courses = screen.getAllByTestId("courseitem");
        const theCourse = courses[0];
        expect(semesterTable)
    });*/
});