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
describe("testing initial render elements", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("renders UD CIS Scheduler text", () => {
        const linkElement = screen.getByText(/Course Scheduler/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    test("renders Semester Table", () => {
        const semesterTableElement = screen.getByText(/Semester 1/i);
        expect(semesterTableElement).toBeInTheDocument();
    });
    
    test("renders concentration header", () => {
        const concentrationHeaderElem = screen.getByText(/Artificial Intelligence and Robotics/i);
        expect(concentrationHeaderElem).toBeInTheDocument();
    
    });
    
    test("renders nav bar", () => {
        const navBar = screen.getByTestId("navbar");
        expect(navBar).toBeInTheDocument();
    
    });

    test("concentration dropdown is in the document", ()=> {
        const concentrationMenu = screen.getByTestId("concentrationMenu");
        expect(concentrationMenu).toBeInTheDocument();
    });

    test("renders course listgroup", () => {
        const courses = screen.getAllByTestId("courseitem");
        for(const c in courses){
            expect(courses[c]).toBeInTheDocument();
        }
    });
});


describe("Testing useful links dropdown", () => {

    beforeEach(() => {
        render(<App />);
    });

    it("should display all links when useful links dropdown is pressed", async () => {

        const navBarDropDown = screen.getByText(/Useful Links/);
        navBarDropDown.click();
        const firstLink = screen.getByTestId("navdropdownitem1");
        const secondLink = screen.getByTestId("navdropdownitem2");
        const thirdLink = screen.getByTestId("navdropdownitem3");
        const fourthLink = screen.getByTestId("navdropdownitem4");
        expect(firstLink).toBeVisible();
        expect(secondLink).toBeVisible();
        expect(thirdLink).toBeVisible();
        expect(fourthLink).toBeVisible();
    });
});

describe("testing navbar buttons", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("renders add semester button", () => {
        const addSemesterButton = screen.getByTestId("addsemesterbutton");
        expect(addSemesterButton).toBeInTheDocument();
    });
    
    test("renders delete semester button", () => {
        const deleteSemesterButton = screen.getByTestId("deletesemesterbutton");
        expect(deleteSemesterButton).toBeInTheDocument();
    });
    
    test("renders export csv button", () => {
        const exportCSV = screen.getByTestId("exportcsvbutton");
        expect(exportCSV).toBeInTheDocument();
    });
    
    test("renders how to button", () => {
        const howToButton = screen.getByTestId("howtobutton");
        expect(howToButton).toBeInTheDocument();
    });

    test("add semester button renders a new semester", () => {
        const addSemesterButton = screen.getByTestId("addsemesterbutton");
        const initialSemesters = screen.getAllByText(/Semester/);
        act(() => {
            addSemesterButton.click();
        });
        const secondSemesters = screen.getAllByText(/Semester/);
        expect(secondSemesters.length).toBeGreaterThan(initialSemesters.length);
    });

    test("delete semester button removes a semester from the screen", () => {
        const addSemesterButton = screen.getByTestId("addsemesterbutton");
        const deleteSemesterButton = screen.getByTestId("deletesemesterbutton");
        act(() => {
            addSemesterButton.click();
        });
        const beforeDelete = screen.getAllByTestId("semesteraccordion");
        act(() => {
            deleteSemesterButton.click();
        });
        const afterDelete = screen.getAllByTestId("semesteraccordion");
        expect(beforeDelete.length).toBeGreaterThan(afterDelete.length);
    
    });
});


test("Selecting concentrations dropdown displays concentrations to choose from", ()=> {
    render(<App />);
    const concentrationMenu = screen.getByText(/Concentrations/);
    concentrationMenu.click();
    const bioConcentration = screen.getByText(/Bioinformatics/);
    expect(bioConcentration).toBeInTheDocument();
});

test("Selecting new concentration renders that concentration", ()=> {
    render(<App />);
    const concentrationMenu = screen.getByText(/Concentrations/);
    concentrationMenu.click();
    const bioConcentration = screen.getByText(/Bioinformatics/);
    expect(bioConcentration).toBeInTheDocument();
    act(()=> {
        bioConcentration.click();
    });
    const concentrationHeaderElem = screen.getByTestId("bio-header");
    expect(concentrationHeaderElem).toBeInTheDocument();
});

/**
 * 
 * Testing button functionality
 * 
 */

describe("testing button clicking features", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Clicking accordions opens and closes them", ()=> {
        const coreAccordion = screen.getByTestId("Core Accordion");
        coreAccordion.click();
        const cisc108 = screen.getByText("CISC108-Intro to CS 1");
        expect(cisc108).toBeInTheDocument();
        coreAccordion.click();
        const cisc181 = screen.queryByText("CISC181");
        expect(cisc181).toBeNull();
    });
    
    test("Clicking triple dots displays detailed course info", ()=> {
        const coreAccordion = screen.getByTestId("Core Accordion");
        coreAccordion.click();
        const dotsButtons = screen.getAllByTestId("dotsButton");
        dotsButtons[0].click();
        const coursedescription = screen.getByText(/Computing/);
        expect(coursedescription).toBeVisible();
    });
});

describe("testing behavior of AddCourse button", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("AddCourse button is rendered in each Course component", () => {
        const addCourseButtons = screen.getAllByTestId("addcoursebutton");

        const courseComponents = screen.getAllByTestId("courseitem");
        expect(addCourseButtons.length).toEqual(courseComponents.length);
    });

    test("clicking AddCourse button causes a modal to appear", () => {
        const coreAccordion = screen.getByTestId("Core Accordion");
        coreAccordion.click();
        const addCourseButtons = screen.getAllByTestId("addcoursebutton");
        act(() => {
            addCourseButtons[0].click();
        });
        const chooseSemesterModal = screen.getByText(/Please Choose a Semester:/);
        expect(chooseSemesterModal).toBeVisible();
    });

    test("AddCourse button successfully moves courses from concentrationContainer to semesterTable", ()=>{
        const coreAccordion = screen.getByTestId("Core Accordion");
        const addSemesterButton = screen.getByTestId("addsemesterbutton");
        addSemesterButton.click();
        coreAccordion.click();
        const addCourseButtons = screen.getAllByTestId("addcoursebutton");
        act(() => {
            addCourseButtons[0].click();
        });
        const initialChooseSemesterButtons = screen.getAllByTestId("choosesemesterbutton");
        act(() => {
            initialChooseSemesterButtons[0].click();
        });
        const initialCoursesInSemester = screen.getAllByTestId("courseinsemester");
        expect(initialCoursesInSemester.length).toEqual(1);

        act(() => {
            addCourseButtons[1].click();
        });
        const newChooseSemesterButtons = screen.getAllByTestId("choosesemesterbutton");
        act(() => {
            newChooseSemesterButtons[1].click();
        });
        const newCoursesInSemester = screen.getAllByTestId("courseinsemester");
        expect(newCoursesInSemester.length).toEqual(2);
    });
});

describe("testing edit course button inside of semesterTable (the one on the right side)", () => {
    beforeEach(()=>{
        render(<App />);
    });
    test("edit course button is visible upon adding a course to a semester", () => {
        const coreAccordion = screen.getByTestId("Core Accordion");
        coreAccordion.click();
        const addCourseButtons = screen.getAllByTestId("addcoursebutton");
        act(() => {
            addCourseButtons[0].click();
        });
        const chooseSemesterButton = screen.getByTestId("choosesemesterbutton");
        act(() => {
            chooseSemesterButton.click();
        });
        const editCourseButton = screen.getByTestId("editcoursebutton");
        expect(editCourseButton).toBeVisible();
    });

    test("clicking edit course button causes a modal to display", () => {
        const coreAccordion = screen.getByTestId("Core Accordion");
        coreAccordion.click();
        const addCourseButtons = screen.getAllByTestId("addcoursebutton");
        act(() => {
            addCourseButtons[0].click();
        });
        const chooseSemesterButton = screen.getByTestId("choosesemesterbutton");
        act(() => {
            chooseSemesterButton.click();
        });
        const editCourseButton = screen.getByTestId("editcoursebutton");
        act(() => {
            editCourseButton.click();
        });
        const editCourseModal = screen.getByText(/Edit Course Details/);
        expect(editCourseModal).toBeVisible();
    });
});

 
// This test doesn't consistently pass? Seems to be a problem with the testing-util package
// Also, these tests are definitely going to throw a warning, saying I simulated a change in state without wrapping it in act()
// Unfortunately, it will be extremely difficult to test any drag and drop features while also calling act(), because I am using
// an imported module to test these features. Basically, we must live with the warning in order to test drag and drop features.
describe("testing drag and drop features", ()=> {
    beforeEach(() => {
        render(<App />);
    });
    test("moves a task down inside a column", async () => {
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