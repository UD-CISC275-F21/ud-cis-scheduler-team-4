import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Semester } from "./Semester";
import { Semester as SemesterType } from "../../interfaces/semester";
import { SavedProgress } from "../../interfaces/savedprogress";
import { Concentration } from "../../interfaces/concentration";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (props: {
        concentration: Concentration;
        setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
        saveData: SavedProgress[];
    }): JSX.Element => {
    const index = props.saveData.findIndex(eachSaveData => eachSaveData.concentration.name === props.concentration.name);
    console.log("IN SEMESTERTABLE, SAVEDATA = ", props.saveData, "index = ", index);
    return(
        index !== -1 ?
            <div>
                {
                    new Array(props.saveData[index].numberOfSemesters).fill(0)
                        .map((elem, ind) => <Semester ind={ind} key={`semester-table-key-${elem}`} semesterCourses={props.saveData[index].semesters} setSemesterCourses={props.setSemesterCourses} />)
                }
            </div>
            :
            <div>Cannot find semester courses</div>
    );
};
