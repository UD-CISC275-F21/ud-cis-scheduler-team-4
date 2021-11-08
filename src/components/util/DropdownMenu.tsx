import { Dropdown } from "react-bootstrap";
import { Concentration } from "../../interfaces/concentration";
import { SemesterType } from "../../interfaces/semester";
import CONCENTRATIONS from "../../json/concentrations.json";
import React from "react";
import { SavedSemesterType } from "../../interfaces/savedsemester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";

export function DropdownMenu(props: {
                                        setConcentration: React.Dispatch<React.SetStateAction<Concentration>>, 

                                        semesterCourses: SemesterType[], 
                                        setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>, 

                                        savedSemesters: SavedSemesterType[], 
                                        setSavedSemesters: React.Dispatch<React.SetStateAction<SavedSemesterType[]>>, 

                                        concentrationContainers: ConcentrationContainerType[], 
                                        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
                                        
                                        setNumSemesters: React.Dispatch<React.SetStateAction<number>>
                                    
                                    }): JSX.Element{
    
    const clickFunc = (ind: number) => {

        console.log(`IND = ${ind}`);

        if(props.savedSemesters.some(e => e.concentrationNumber === ind)){
            // we have a saved semester
            console.log("INSIDE OF SAVED SEMESTER IF");
            console.log(`savedSemester = ${props.savedSemesters.forEach(e => console.log(Object.values(e)))}`);
            const theSavedSemester = props.savedSemesters.find(e => e.concentrationNumber === ind);
            if(theSavedSemester?.semesterCourses !== undefined){
                console.log("in semester courses if");
                props.setSemesterCourses([...theSavedSemester?.semesterCourses]);
            } else{
                props.setSemesterCourses([]);
            }
            if(theSavedSemester?.numSemesters !== undefined){
                console.log("in num semester if");
                props.setNumSemesters(theSavedSemester?.numSemesters);
            } else {
                props.setNumSemesters(1);
            }
            if(theSavedSemester?.concContainers !== undefined){
                console.log("in conc conatiner if");
                props.setConcentrationContainers(theSavedSemester.concContainers);
            } else {
                props.setConcentrationContainers([]);
            }

        } else{

            /*

            SETTING SAVED SEMESTER

            */
            
            console.log("SWITCHING TO SEMESTER THAT IS NOT SAVED");
            console.log(`savedSemester1 = ${props.savedSemesters.forEach(e => console.log(Object.values(e)))}`);
            console.log(`concontainers = ${props.concentrationContainers.forEach(e => console.log(Object.values(e)))}`);
            console.log(`semesterCourses = ${props.semesterCourses.forEach(e => console.log(Object.values(e)))}`);
            //TODO: WE HAVE ALL CURRENT COURSES, IN HERE COULDN'T WE JUST SAVE IT TO A SAVED SEMESTER NOW? AND FIX THE BUG THAT WAS HAPPENING
            const tmpSavedSemester = [...props.savedSemesters];
            tmpSavedSemester.splice(0,0,{ concentrationNumber: ind, semesterCourses: [...props.semesterCourses], concContainers: [...props.concentrationContainers], numSemesters: props.semesterCourses.length});
            props.setSavedSemesters([...tmpSavedSemester]);
            console.log(`saved semesters = ${props.savedSemesters.forEach(e => console.log(Object.values(e)))}`);

            /*

            USUAL FUNC

            */

            const tmpSemesterCourses = [...props.semesterCourses];

            for(let i = 0; i < tmpSemesterCourses.length; i++){

                const tmpSemester = tmpSemesterCourses.splice(i,1)[0];
                tmpSemester.courses = [];
                tmpSemester.courseSetter([]);
                tmpSemesterCourses.splice(i,0,tmpSemester);

            }
            props.setSemesterCourses([...tmpSemesterCourses]);

            props.setConcentration(CONCENTRATIONS[ind]);
            console.log(`savedSemester2 = ${props.savedSemesters.forEach(e => console.log(Object.values(e)))}`);
        }

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