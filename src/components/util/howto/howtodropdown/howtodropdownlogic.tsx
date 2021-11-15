import React from "react";
import { HowToNavigation } from "../howtosteps/howtonavigation";

export const HandleHowToDisplay = (display: number): JSX.Element => {

    switch (display) {

    case 0:
        return <HowToNavigation />;
    default:
        return <div />;

    }

};
