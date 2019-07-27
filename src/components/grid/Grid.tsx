import React from "react";
import {ValuesDictionary} from '../../expressions/Expressions';

interface GridProps {
    setCellSelected(cellSelected: string): any;
    cellValues: ValuesDictionary;
}

export const Grid: React.FC<GridProps> = () => {
    return null;
};