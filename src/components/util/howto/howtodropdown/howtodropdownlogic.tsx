import React from "react";
import { HowToNavigation } from "../howtosteps/howtonavigation";
import { WholeAppInfo } from "../howtosteps/wholeappinfo";
import { ConcentrationContainerInfo } from "../howtosteps/howtoconcentrationcontainer";
import { NavBarInfo } from "../howtosteps/howtonavbar";

export const HandleHowToDisplay = (display: number): JSX.Element => {

    switch (display) {

    case 0:
        return <HowToNavigation />;
    case 1:
        return <WholeAppInfo />;
    case 2:
        return <NavBarInfo />;
    case 3:
        return <ConcentrationContainerInfo />;
    default:
        return <div />;

    }

};
