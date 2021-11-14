import React from "react";
import { SemesterType } from "../../interfaces/semester";
import { Button } from "react-bootstrap";

export const ExportPlan = (props: {semesterCourses: SemesterType[]}): JSX.Element => {
    const data = [["Semester", "Course", "Credits"]];

    return (
        <Button variant="outline-secondary" onClick={() => {
            for(let i=0;i<props.semesterCourses.length;i++){
                const courses = props.semesterCourses[i].courses;
                const semesterNum = (i+1).toString();
                for(let j=0;j<courses.length;j++){
                    const courseName = courses[j].name;
                    const credits = courses[j].credits.toString();
                    data.push([semesterNum,courseName,credits]);
                };
            };
            const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => e.join(",")).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_course_plan.csv");
            document.body.appendChild(link); 
            link.click();
        }}>Export CSV</Button>
    );
};