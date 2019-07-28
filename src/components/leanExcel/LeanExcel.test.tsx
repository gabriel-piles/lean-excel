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
    wrapper.find('Grid').props().setCellSelected('A2');

    expect(wrapper.find('InputBox').props().cellSelected).toEqual('A2');
    expect(wrapper.find('InputBox').props().expression).toEqual('an expression');
});

it('change cell value', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('Grid').props().setCellSelected('A1');
    wrapper.find('InputBox').props().updateCellExpression('1');

    expect(wrapper.find('Grid').props().cellValues).toEqual({A1: '1_evaluated'});
});

it('set typing formula on', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    expect(wrapper.find('Grid').props().typingFormula).toEqual(false);

    wrapper.find('InputBox').props().setTypingFormula(true);

    expect(wrapper.find('Grid').props().typingFormula).toEqual(true);
});

it('set typing formula off', () => {
    const wrapper = shallow(<LeanExcel expressions={new ExpressionsStub()}/>);
    wrapper.find('InputBox').props().setTypingFormula(true);
    wrapper.find('InputBox').props().setTypingFormula(false);
    expect(wrapper.find('Grid').props().typingFormula).toEqual(false);
});

it('no expression update when typing mode', () => {
    let expressionsStub = new ExpressionsStub();
    expressionsStub.set('A2', 'an expression');
    const wrapper = shallow(<LeanExcel expressions={expressionsStub}/>);
    wrapper.find('InputBox').props().setTypingFormula(true);

    wrapper.find('Grid').props().setCellSelected('A2');
    expect(wrapper.find('InputBox').props().expression).toEqual('');
});