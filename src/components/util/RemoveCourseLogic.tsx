import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { UseStateContext } from "./DispatchLogic/UseStateContext";

export const removeCourse = (name: string, concentrationContainerIndex: number) => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();

    console.log(state.concentrationContainers[concentrationContainerIndex].courses);

    
};