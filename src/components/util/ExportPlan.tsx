import React from "react";
import { Button } from "react-bootstrap";
import { UseStateContext } from "./DispatchLogic/UseStateContext";

export const ExportPlan = (): JSX.Element => {
    const data: string[][] = [["Semester", "Course", "Credits"]];
    const { state } = UseStateContext();

    return (
        <Button
            data-testid="exportcsvbutton"
            size="sm"
            onClick={() => {
                for (let i = 0; i < state.currentSaveData.semesters.length; i += 1) {
                    const courses = state.currentSaveData.semesters[i].courses;
                    const semesterNum = (i + 1).toString();
                    for (const eachcourse of courses) {
                        const courseName = eachcourse.name;
                        const credits = eachcourse.credits.toString();
                        data.push([semesterNum, courseName, credits]);
                    }
                }
                const csvContent = `data:text/csv;charset=utf-8,${data.map(elem => elem.join(",")).join("\n")}`;

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_course_plan.csv");
                document.body.appendChild(link);
                link.click();
            }}
            variant="outline-secondary"
        >
            Export CSV
        </Button>
    );
};
