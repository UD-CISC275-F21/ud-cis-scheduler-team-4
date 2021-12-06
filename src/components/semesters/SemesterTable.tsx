import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Semester as SemesterComponent } from "./Semester";
import { Semester as SemesterType } from "../../interfaces/semester";
import { SavedProgress } from "../../interfaces/savedprogress";
import { Concentration } from "../../interfaces/concentration";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (): JSX.Element => {
        
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <>
        </>
    );
};
