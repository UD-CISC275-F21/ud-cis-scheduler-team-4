import React from "react";
import { render, screen } from "@testing-library/react";
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


/**
 * 
 * Testing button functionality
 * 
 */

test("add semester button renders a new semester", () => {
    render(<App />);
    const addSemesterButton = screen.getByTestId('addsemesterbutton');
    const firstSemesters = screen.getAllByText(/Semester/);

    // getAllByText(/Semester/) will also grab the add semesters button, thus the initial length will be 2. 
    // A better way to test this would be good, because if we add a new button with the text 'semester', it will cause this test to fail
    expect(firstSemesters).toHaveLength(2);
    addSemesterButton.click();
    const secondSemesters = screen.getAllByText(/Semester/);
    expect(secondSemesters).toHaveLength(3);
});

 test("renders courses", () => {
    render(<App />);
    const courses = screen.getAllByTestId("courseitem");
    for(let c in courses){
        expect(courses[c]).toBeInTheDocument();
    }
});
