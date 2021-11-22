import { NavDropdown } from "react-bootstrap";
import { Concentration } from "../../interfaces/concentration";
import { SemesterType } from "../../interfaces/semester";
import { SaveState } from "../../interfaces/savestate";
import CONCENTRATIONS from "../../json/concentrations.json";
import React from "react";

export const DropdownMenu = (props: {
        setConcentration: React.Dispatch<React.SetStateAction<Concentration>>;
        semesterCourses: SemesterType[];
        setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
        saveProgress: () => void;
        getProgress: (concName: string) => SaveState | undefined;
    }): JSX.Element => {

    const clickFunc = (ind: number) => {

        //localStorage.clear();

        props.saveProgress();
        
        console.log("accessing", CONCENTRATIONS[ind].name);

        const result: SaveState | undefined = props.getProgress(CONCENTRATIONS[ind].name);

        console.log("result is ", result);

        if(result !== undefined){
            // courses are saved
            console.log("ACQUIRED SAVED RESULT");
            console.log(Object.values(result.concentrationCourses));
            console.log(Object.values(result.semesters));
        }

        const tmpSemesterCourses = [...props.semesterCourses];

        for (let i = 0; i < tmpSemesterCourses.length; i += 1) {

            const tmpSemester = tmpSemesterCourses.splice(i, 1)[0];
            tmpSemester.courses = [];
            tmpSemester.courseSetter([]);
            tmpSemesterCourses.splice(i, 0, tmpSemester);

        }
        props.setSemesterCourses([...tmpSemesterCourses]);
        props.setConcentration(CONCENTRATIONS[ind]);

    };

    return (
        <div>
            <NavDropdown id="basic-navbar-nav" title="Concentrations" >

                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(0);
                    }}
                >AI and Robotics
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(1);
                    }}
                >
                    Bioinformatics
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(2);
                    }}
                >
                    Cybersecurity
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(3);
                    }}
                >
                    Data Science
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(4);
                    }}
                >
                    High-Performance Computing
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(5);
                    }}
                >
                    Networks and Systems
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(6);
                    }}
                >
                    Theory
                </NavDropdown.Item>

            </NavDropdown>
        </div>
    );
};
