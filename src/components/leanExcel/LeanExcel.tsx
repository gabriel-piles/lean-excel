import React, {useState} from 'react';
import {InputBox} from '../inputBox/InputBox';
import {Grid} from '../grid/Grid';
import {Expressions} from '../../expressions/Expressions';
import {ValuesDictionary} from "../../expressions/ValueDictionary";
import {CellKey} from "../../expressions/cellKey/CellKey";

interface LeanExcelProps {
    expressions: Expressions
}

const LeanExcel: React.FC<LeanExcelProps> = (props) => {
    const {expressions} = props;
    const [cellSelected, setCellSelected] = useState<string>('A1');
    const [expression, setExpression] = useState<string>('');
    const [valuesDictionary, setValuesDictionary] = useState<ValuesDictionary>({});

    const updateCellExpression = (expression: string) => {
        expressions.set(cellSelected, expression);
        setValuesDictionary(expressions.toValues());
        selectNextCell();
    };

    const selectNextCell = () => {
        const cellKey = new CellKey(cellSelected);
        updateCellSelected(cellKey.getNextKey());
    };

    const updateCellSelected = (cellSelected: string) => {
        setCellSelected(cellSelected);
        setExpression(expressions.get(cellSelected));
    };

    return (
        <div>
            <InputBox
                cellSelected={cellSelected}
                expression={expression}
                updateCellExpression={updateCellExpression}/>
            <Grid setCellPressed={updateCellSelected}  cellValues={valuesDictionary} cellSelected={cellSelected}/>
        </div>
    );
};

export {LeanExcel};