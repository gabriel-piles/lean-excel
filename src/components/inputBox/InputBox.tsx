import React from "react";

interface InputBoxProps {
    cellSelected: string;
    updateCellExpression(expression: string): any;
    expression: string;
}

export const InputBox: React.FC<InputBoxProps> = (props) => {

    const updateExpression = (e:any) => {
        props.updateCellExpression(e.target.value);
    };

    return (
        <div>
            <span className='cell-name'>{props.cellSelected}</span>
            <input className="input-box" type='text' value={props.expression} onChange={updateExpression}/>
        </div>
        );
};