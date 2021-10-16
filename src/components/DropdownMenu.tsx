import { Dropdown } from "react-bootstrap";
import React from "react";

export function DropdownMenu(): JSX.Element{
    return <div>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Concentrations:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">AI and Robotics</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Bioinformatics</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Cybersecurity</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Data Science</Dropdown.Item>
                <Dropdown.Item href="#/action-3">High-Performance Computing</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Networks and Systems</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Theory</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>;
}