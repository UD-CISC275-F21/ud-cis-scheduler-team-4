import { SaveState } from "../../../interfaces/savestate";

export const GetSaveState = (
    concentrationName: string
): SaveState | undefined => {
    console.log("GETSAVESTATE : NAME : ", concentrationName);
    const result: string | null = localStorage.getItem(concentrationName);
    return result !== null ? JSON.parse(result) : undefined;
};
