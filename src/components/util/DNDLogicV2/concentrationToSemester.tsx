import { State } from "../../MainPage";
import { SchedulerAction } from "../../MainPage";
import React from "react";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";

export const concentrationToSemesterV2 = (
    sourceIndex: number,
    droppingIndex: number,
    concentrationContainers: ConcentrationContainerType[],
    semesters: Semester[],
    concentrationIndex: number,
    semesterIndex: number,
    dispatch: React.Dispatch<SchedulerAction>,
    state: State
): void => {
    console.log("running concentrationToSemester");
    dispatch({type: "concentrationToSemester", payload: {
        ...state,
        sourceIndex: sourceIndex,
        sourceContainerIndex: concentrationIndex,
        destIndex: droppingIndex,
        destContainerIndex: semesterIndex
    }});
};
