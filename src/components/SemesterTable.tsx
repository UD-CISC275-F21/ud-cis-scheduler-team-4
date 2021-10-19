import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import React, { useState } from "react";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { ScriptSnapshot } from "typescript";

export const getSemesterStr = (semesterNum: number): string => {
    switch (semesterNum % 10) {
    case 1:
        return `${semesterNum}st`;
    case 2:
        return `${semesterNum}nd`;
    case 3:
        return `${semesterNum}rd`;
    default:
        return `${semesterNum}th`;
    }
};

export const SemesterTable = (): JSX.Element => {
    const [semesters, setSemesters] = useState<number>(1);
    return (
        <Droppable droppableId="semester-table">
            {(prov: DroppableProvided) => (

                <Table >
                    <thead>
                        <tr>
                            {new Array(semesters).fill(0).map((e, i) => <th key={i}>{`${getSemesterStr(i + 1)} semester`}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                new Array(semesters).fill(0).map(e => <td {...prov.droppableProps} ref={prov.innerRef} key={e} >{prov.placeholder}</td>)
                            }
                        </tr>
                    </tbody>
                </Table>

            )}
        </Droppable>
    );
};
