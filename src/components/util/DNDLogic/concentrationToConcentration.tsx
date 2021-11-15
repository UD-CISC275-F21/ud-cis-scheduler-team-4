import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";

export const concentrationToConcentration = (
    result: DropResult,
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    courseSpliceInd: number,
    dropInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    isDifferent: boolean,
): number => {
    console.log("in concentration ---> concentration");
    const ind2 = (isDifferent) ?
        concContainers.findIndex(elem => elem.name === result.destination?.droppableId) : -1;
    if (ind2 === -1) { /* Case if we are dropping within the same _exact_ container such as core --> core */
        const tmpConcContainerCourse = concContainer.courses.splice(courseSpliceInd, 1)[0];
        concContainer.courses.splice(dropInd, 0, tmpConcContainerCourse);
        concContainer.setCourses([...concContainer.courses]);/* may be able to delete this line */
        concContainers.splice(spliceInd, 0, concContainer);/* may not have to deal with splicing, and direct reference the index like above with the implementation of semester --> concentration */
        setConcContainers(concContainers);
    } else if (ind2 !== -1) { /* Case if we are dropping within the concentration containers, but different containers, such as core --> elective */
        const diffContainer = concContainers[ind2];
        const tmpConcContainerCourseDrag = concContainer.courses.splice(courseSpliceInd, 1)[0];
        concContainer.setCourses([...concContainer.courses]);// update courses we just spliced from
        diffContainer.courses.splice(dropInd, 0, tmpConcContainerCourseDrag);
        diffContainer.setCourses([...diffContainer.courses]);
    }
    return 1;
};
