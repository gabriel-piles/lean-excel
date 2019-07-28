import React, {Component} from "react";
import './InputBox.css';

interface InputBoxProps {
    cellSelected: string;
    expression: string;

    updateCellExpression(expression: string): any;

    setTypingFormula(typingFormula: boolean): any;
}

interface InputBoxState {
    cellSelected: string;
    typingFormula: boolean;
    expression: string;
}

export class InputBox extends Component<InputBoxProps, InputBoxState> {
    constructor(props: InputBoxProps) {
        super(props);

        this.state = {
            cellSelected: 'A1',
            typingFormula: false,
            expression: this.props.expression
        };

        this.expressionUpdated = this.expressionUpdated.bind(this);
    }

    expressionUpdated(e: any) {
        const expression = e.target.value;
        let inputNoSpaces = expression.replace(/\s/, '');
        let typingFormula = !!/^=/.exec(inputNoSpaces);

        this.setState({typingFormula: typingFormula});
        this.setState({expression: expression});

        this.props.setTypingFormula(typingFormula);
        this.props.updateCellExpression(expression);
    };

    componentDidUpdate(prevProps: Readonly<InputBoxProps>, prevState: Readonly<InputBoxState>, snapshot?: any): void {
        if (prevProps.cellSelected !== this.props.cellSelected && this.state.typingFormula) {
            const {expression} = this.state;
            this.setState({expression: expression + this.props.cellSelected});
        }

        if (this.state.expression !== this.props.expression) {

            this.setState({expression: this.props.expression})
        }
    }

    render() {
        let {cellSelected, typingFormula} = this.state;

        if (!typingFormula) {
            cellSelected = this.props.cellSelected;
            if (cellSelected !== this.props.cellSelected)
                this.setState({cellSelected: cellSelected});
        }

        return (
            <div className={'input-section'}>
                <div className={'input-container'}>
                    <div className="ui labeled input">
                        <div className="ui label label">{cellSelected}</div>
                        <input key={cellSelected} type="text" className="input-box"
                               value={this.state.expression}
                               onChange={this.expressionUpdated}/>
                    </div>
                </div>
            </div>


            // <div className={'input-container'}>
            //     <span className='cell-name'>{cellSelected}</span>
            //     <input key={cellSelected} className="input-box" type='text'
            //            value={this.state.expression}
            //            onChange={this.expressionUpdated}/>
            // </div>
        );
    }
}