import React, {useState} from 'react';
import {InputBox} from '../inputBox/InputBox';
import {Grid} from '../grid/Grid';
import {Expressions, ValuesDictionary} from "../../expressions/Expressions_";

interface LeanExcelProps {
    expressions: Expressions
}

const LeanExcel: React.FC<LeanExcelProps> = (props) => {
    const {expressions} = props;
    const [cellSelected, setCellSelected] = useState<string>('A1');
    const [valuesDictionary, setValuesDictionary] = useState<ValuesDictionary>({});

    const updateCellExpression = (expression: string) => {
        expressions.set(cellSelected, expression);
        setValuesDictionary(expressions.toValues());
    };

    return (
        <div>
            <InputBox cellSelected={cellSelected} updateCellExpression={updateCellExpression}/>
            <Grid setCellSelected = {setCellSelected} cellValues={valuesDictionary}/>
        </div>
    );
};

export {LeanExcel};