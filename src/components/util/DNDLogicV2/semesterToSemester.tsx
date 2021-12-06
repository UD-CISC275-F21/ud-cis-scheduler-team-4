import { State } from "../../MainPage";
import { SchedulerAction } from "../../MainPage";
import React from "react";

export const semesterToSemester = (

    state: State,
    dispatch: React.Dispatch<SchedulerAction>,
    semesterIndex: number,
    sourceIndex: number,
    dropIndex: number,

): void => {
    dispatch({type: "semesterToSemester", payload: {
        ...state,
        sourceContainerIndex: semesterIndex,
        destContainerIndex: semesterIndex,
        destIndex: dropIndex,
        sourceIndex: sourceIndex
    }});
};