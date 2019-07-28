import React, {useState} from 'react';
import {InputBox} from '../inputBox/InputBox';
import {Grid} from '../grid/Grid';
import {Expressions} from '../../expressions/Expressions';
import {ValuesDictionary} from "../../expressions/ValueDictionary";

interface LeanExcelProps {
    expressions: Expressions
}

const LeanExcel: React.FC<LeanExcelProps> = (props) => {
    const {expressions} = props;
    const [cellSelected, setCellSelected] = useState<string>('A1');
    const [typingFormula, setTypingFormula] = useState<boolean>(false);
    const [expression, setExpression] = useState<string>('');
    const [valuesDictionary, setValuesDictionary] = useState<ValuesDictionary>({});

    const updateCellExpression = (expression: string) => {
        expressions.set(cellSelected, expression);
        setValuesDictionary(expressions.toValues());
    };

    const updateCellSelected = (cellSelected: string) => {
        setCellSelected(cellSelected);

        if(!typingFormula){
            setExpression(expressions.get(cellSelected));
        }
    };

    return (
        <div>
            <InputBox
                cellSelected={cellSelected}
                expression={expression}
                updateCellExpression={updateCellExpression}
                setTypingFormula = {setTypingFormula}/>
            <Grid setCellSelected = {updateCellSelected} typingFormula = {typingFormula} cellValues={valuesDictionary}/>
        </div>
    );
};

export {LeanExcel};