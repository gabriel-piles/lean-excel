import React from 'react';
import _ from 'lodash';
import './Grid.css';
import {ValuesDictionary} from '../../expressions/ValueDictionary';

const COLUMN_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ROW_NUMBER = 50;

interface GridProps {
    cellValues: ValuesDictionary;
    cellSelected: string;
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
                        const cellKey = column_name + (row_index + 1);
                        return <td key={cellKey}
                                   id={cellKey}
                                   className={`column ${cellKey} ${props.cellSelected === cellKey ? 'cell-selected' : ''}`}
                                   onClick={(e) => updateCellSelected(e.currentTarget.id)}>
                            {props.cellValues[cellKey] ? props.cellValues[cellKey] : ''}
                        </td>
                    })}
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};