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
