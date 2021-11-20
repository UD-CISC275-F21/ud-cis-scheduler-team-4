import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: {
        setDelete: React.Dispatch<React.SetStateAction<number>>;
    }): JSX.Element => 

    <Button variant="outline-danger" data-testid="deletesemesterbutton" onClick={() => {
        props.setDelete(0);
    }}>Delete Semester</Button>;
