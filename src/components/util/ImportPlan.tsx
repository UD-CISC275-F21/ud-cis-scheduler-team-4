import React from "react";
import { Button } from "react-bootstrap";
import { ProcessCSVData } from "./DataProcessing/ProcessCSVData";
import * as XLSX from "xlsx";

export const ImportPlan = (): JSX.Element => {

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (evt.target !== null) {
                    const bstr = evt.target.result;
                    const wb = XLSX.read(bstr, {type: "binary"});
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_csv(ws, { RS: "#"});
                    const result: string[][] | undefined = ProcessCSVData(data.split("#"));
                    if (result !== undefined) {
                        console.log(result);
                    }
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    return(
        <>  
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload}/>
        </>
    );

};