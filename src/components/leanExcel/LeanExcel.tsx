import React, {useState} from 'react';
import {InputBox} from '../inputBox/InputBox';
import {Grid} from '../grid/Grid';

const LeanExcel: React.FC = () => {
    const cellExpressions: Record<string, string> = {};

    const [cellSelected, setCellSelected] = useState<string>('A1');

    const updateCellExpression = (expression: string) => {
        cellExpressions[cellSelected] = expression;
    };

    return (
        <div>
            <InputBox cellSelected={cellSelected} updateCellExpression={updateCellExpression}/>
            <Grid setCellSelected = {setCellSelected} cellValues={cellExpressions}/>
        </div>
    );
};


export {LeanExcel};