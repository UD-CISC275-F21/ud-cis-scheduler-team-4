import React from "react";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { ProgressBar } from "react-bootstrap";

export const Footer = (): JSX.Element => {

    const { state } = UseStateContext();

    const percentage = Math.round(((state.currentSaveData.semesters.map((eachSemester) => eachSemester.courses).flat(2).length / 40)*100));

    return(
        <div className="footer">
            <hr />
            <ProgressBar animated now={percentage} label={`${percentage}%`} striped variant="success" />
            <br />
            <p>
                Created by Kurt Hammen, Luke Halko, and Cameron Thacker. Made 2021. Check out
                {" "}
                <a href="https://github.com/UD-CISC275-F21/ud-cis-scheduler-team-4" rel="noopener noreferrer" target="_blank">our repository.</a>
            </p>
        </div>
    );
    
};

// github repository
// see what other people have
