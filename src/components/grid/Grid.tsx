import React from "react";
import {ValuesDictionary} from '../../expressions/Expressions';
import _ from "lodash";

const COLUMN_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ROW_NUMBER = 50;

interface GridProps {
    setCellSelected(cellSelected: string): any;
    cellValues: ValuesDictionary;
}

export const Grid: React.FC<GridProps> = () => {
    return (
        <table>
            {_.times(ROW_NUMBER,(row_index) => <tr className={'row'}>
                {COLUMN_NAMES.map((column_name) => {
                    return <td className={`column ${column_name}${row_index+1}`}></td>
                })}
            </tr>)}
        </table>
    );
};