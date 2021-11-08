import { Dropdown } from "react-bootstrap";
import { Concentration } from "../../interfaces/concentration";
import { SemesterType } from "../../interfaces/semester";
import CONCENTRATIONS from "../../json/concentrations.json";
import React from "react";

export function DropdownMenu(props: { setConcentration: React.Dispatch<React.SetStateAction<Concentration>>, semesterCourses: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>> }): JSX.Element{
    
    const clickFunc = (ind: number) => {

        const tmpSemesterCourses = [...props.semesterCourses];

        for(let i = 0; i < tmpSemesterCourses.length; i++){

            const tmpSemester = tmpSemesterCourses.splice(i,1)[0];
            tmpSemester.courses = [];
            tmpSemester.courseSetter([]);
            tmpSemesterCourses.splice(i,0,tmpSemester);

        }
        props.setSemesterCourses([...tmpSemesterCourses]);

        props.setConcentration(CONCENTRATIONS[ind]);

    };

    return <div>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Concentrations:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                
                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(0);
                }}>AI and Robotics</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(1);
                }}>Bioinformatics</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(2);
                }}>Cybersecurity</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(3);
                }}>Data Science</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(4);
                }}>High-Performance Computing</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(5);
                }}>Networks and Systems</Dropdown.Item>


                <Dropdown.Item as="button" onClick={()=>{
                    clickFunc(6);
                }}>Theory</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    </div>;
}