import React from "react";
import { HowToNavigation } from "../howtosteps/howtonavigation";
import { WholeAppInfo } from "../howtosteps/wholeappinfo";

export const HandleHowToDisplay = (display: number): JSX.Element => {

    switch (display) {

    case 0:
        return <HowToNavigation />;
    case 1:
        return <WholeAppInfo />;
    default:
        return <div />;

    }

};
