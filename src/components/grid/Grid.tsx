import React from "react";
import _ from "lodash";
import './Grid.css';
import {ValuesDictionary} from "../../expressions/ValueDictionary";

const COLUMN_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ROW_NUMBER = 50;

interface GridProps {
    cellValues: ValuesDictionary;
    cellSelect: string;
    setCellPressed(cellSelected: string): any;
}

export const Grid: React.FC<GridProps> = (props) => {
    const updateCellSelected = (cellSelected:string) => {
        props.setCellPressed(cellSelected);
    };

    return (
        <div className={'grid'}>
            <table>
                <tbody>
                {_.times(ROW_NUMBER, (row_index) => <tr key={`row${row_index}`} className={'row'}>
                    {COLUMN_NAMES.map((column_name) => {
                        const cellId = column_name + (row_index + 1);
                        return <td key={cellId}
                                   id={cellId}
                                   className={`column ${cellId} ${props.cellSelect === cellId ? 'cell-selected' : ''}`}
                                   onClick={(e) => updateCellSelected(e.currentTarget.id)}>
                            {props.cellValues[cellId] ? props.cellValues[cellId] : ''}
                        </td>
                    })}
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};