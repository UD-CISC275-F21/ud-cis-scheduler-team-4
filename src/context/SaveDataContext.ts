import { SavedProgress } from "../interfaces/savedprogress";
import React from "react";

export const SaveDataContext = React.createContext<SavedProgress[]>([]);