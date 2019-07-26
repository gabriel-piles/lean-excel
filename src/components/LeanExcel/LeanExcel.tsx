import React, {useState} from 'react';
import {Grid} from '../Grid/Grid';
import {InputBox} from '../InputBox/InputBox';

export const LeanExcel: React.FC = () => {
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



