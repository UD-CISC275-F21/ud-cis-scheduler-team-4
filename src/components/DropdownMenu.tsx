import { Dropdown } from "react-bootstrap";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import React from "react";

export function DropdownMenu({setConcentration}:
    {setConcentration: (concentration:Concentration)=>void}): JSX.Element{
    
    return <div>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Concentrations:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[0])}>AI and Robotics</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[1])}>Bioinformatics</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[2])}>Cybersecurity</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[3])}>Data Science</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[4])}>High-Performance Computing</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[5])}>Networks and Systems</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration(CONCENTRATIONS[6])}>Theory</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>;
}