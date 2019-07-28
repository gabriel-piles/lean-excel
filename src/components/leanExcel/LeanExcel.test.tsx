import React from 'react';
import { shallow } from 'enzyme';
import {LeanExcel} from './LeanExcel';
import {Expressions} from '../../expressions/Expressions';
import _ from 'lodash';
import {ExpressionsDictionary} from "../../expressions/ExpressionsDictionary";
import {ValuesDictionary} from "../../expressions/ValueDictionary";

class ExpressionsStub extends Expressions{
    private cellExpressions: ExpressionsDictionary = {};

    public set(key:string, expression:string){
        this.cellExpressions[key] = expression;
    }

    public toValues():ValuesDictionary{
        let values = _.mapValues(this.cellExpressions, (eachExpression) => eachExpression + '_evaluated');
        return values;
    }

    get(key: string):string {
        return this.cellExpressions[key];
    }
}

it('update input when cell selected', () => {
    let expressionsStub = new ExpressionsStub();
    expressionsStub.set('A2', 'an expression');
    const wrapper = shallow(<LeanExcel expressions={expressionsStub}/>);
    wrapper.find('Grid').props().setCellPressed('A2');

    expect(wrapper.find('InputBox').props().cellSelected).toEqual('A2');
    expect(wrapper.find('InputBox').props().expression).toEqual('an expression');
});

it('update cell selected when cell pressed', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('Grid').props().setCellPressed('A2');

    expect(wrapper.find('Grid').props().cellSelect).toEqual('A2');
});

it('change cell value', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('Grid').props().setCellPressed('A2');
    wrapper.find('InputBox').props().updateCellExpression('1');

    expect(wrapper.find('Grid').props().cellValues).toEqual({A2: '1_evaluated'});
});

it('move to next cell when cell updated', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('InputBox').props().updateCellExpression('1');

    expect(wrapper.find('Grid').props().cellSelect).toEqual('A2');
});

it('do not move to next cell when last row', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('Grid').props().setCellPressed('A50');

    wrapper.find('InputBox').props().updateCellExpression('1');

    expect(wrapper.find('Grid').props().cellSelect).toEqual('A50');
});
