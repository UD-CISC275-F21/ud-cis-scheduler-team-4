import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { SchedulerAction } from "../../MainPage";
import { State } from "../../MainPage";

export const concentrationToConcentration = (
    result: DropResult,
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    courseSpliceInd: number,
    dropInd: number,
    dispatch: React.Dispatch<SchedulerAction>,
    isDifferent: boolean,
    state: State
): number => {
    console.log("in concentration ---> concentration");
    const ind2 = isDifferent ?
        concContainers.findIndex(elem => elem.name === result.destination?.droppableId) : -1;
    if (ind2 === -1) { /* Case if we are dropping within the same _exact_ container such as core --> core */
        const tmpConcContainerCourse = concContainer.courses.splice(courseSpliceInd, 1)[0];
        concContainer.courses.splice(dropInd, 0, tmpConcContainerCourse);
        // DEBUG concContainer.setCourses([...concContainer.courses]);/* may be able to delete this line */
        concContainers.splice(spliceInd, 0, concContainer);/* may not have to deal with splicing, and direct reference the index like above with the implementation of semester --> concentration */
        dispatch({type: "updateConcentrationContainers", payload: { ...state, concentrationContainers: concContainers }});
    } else if (ind2 !== -1) { /* Case if we are dropping within the concentration containers, but different containers, such as core --> elective */
        const diffContainer = concContainers[ind2];
        const tmpConcContainerCourseDrag = concContainer.courses.splice(courseSpliceInd, 1)[0];
        // DEBUG concContainer.setCourses([...concContainer.courses]);// update courses we just spliced from
        diffContainer.courses.splice(dropInd, 0, tmpConcContainerCourseDrag);
        // DEBUG diffContainer.setCourses([...diffContainer.courses]);
        dispatch({type: "updateConcentrationContainers", payload: { ...state, concentrationContainers: concContainers }});
    }
    return 1;
};
