import React from 'react';
import { shallow } from 'enzyme';
import {LeanExcel} from './LeanExcel';
import {Expressions, ExpressionsDictionary, ValuesDictionary} from '../../expressions/Expressions';
import _ from 'lodash';

class ExpressionsStub implements Expressions{
    private cellExpressions: ExpressionsDictionary = {};

    public set(key:string, expression:string){
        this.cellExpressions[key] = expression;
    }

    public toValues():ValuesDictionary{
        let values = _.mapValues(this.cellExpressions, (eachExpression) => eachExpression + '_evaluated');
        return values;
    }
}

it('change cell value', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('Grid').props().setCellSelected('A1');
    wrapper.find('InputBox').props().updateCellExpression('1');

    expect(wrapper.find('Grid').props().cellValues).toEqual({A1: '1_evaluated'});
});