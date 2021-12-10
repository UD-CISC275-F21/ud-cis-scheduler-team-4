import { NavDropdown } from "react-bootstrap";
import CONCENTRATIONS from "../../json/concentrations.json";
import React from "react";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const DropdownMenu = (): JSX.Element => {

    const { dispatch } = UseDispatchContext();
    const { state } = UseStateContext();

    const clickFunc = (concentrationNumber: number) => {
        dispatch({type: "updateConcentration", payload: { ...state, concentration: CONCENTRATIONS[concentrationNumber]}});
    };

    return (
        <div>
            <NavDropdown id="basic-navbar-nav" title="Concentrations" data-testid="concentrationMenu">

                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(0);
                    }}
                >AI and Robotics
                </NavDropdown.Item>


                <NavDropdown.Item data-testid="bioConcentration"
                    as="button"
                    onClick={() => {
                        clickFunc(1);
                    }}
                >
                    Bioinformatics
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(2);
                    }}
                >
                    Cybersecurity
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(3);
                    }}
                >
                    Data Science
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(4);
                    }}
                >
                    High-Performance Computing
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(5);
                    }}
                >
                    Networks and Systems
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(6);
                    }}
                >
                    Theory
                </NavDropdown.Item>

            </NavDropdown>
        </div>
    );
};
