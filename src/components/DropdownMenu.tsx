import { Dropdown } from "react-bootstrap";
import React from "react";

export function DropdownMenu({concentration, setConcentration}:
    {concentration:string, setConcentration: (concentration:string)=>void}): JSX.Element{
    
    return <div>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Concentrations:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={()=>setConcentration("AI")}>AI and Robotics</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("Bio")}>Bioinformatics</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("Security")}>Cybersecurity</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("Data Science")}>Data Science</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("HPC")}>High-Performance Computing</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("Networks")}>Networks and Systems</Dropdown.Item>
                <Dropdown.Item as="button" onClick={()=>setConcentration("Theory")}>Theory</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>;
}