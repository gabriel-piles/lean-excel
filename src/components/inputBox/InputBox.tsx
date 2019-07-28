import React, {Component} from "react";
import './InputBox.css';

interface InputBoxProps {
    cellSelected: string;
    expression: string;
    updateCellExpression(expression: string): any;
}

export class InputBox extends Component<InputBoxProps> {
    constructor(props: InputBoxProps) {
        super(props);

        this.state = {
            cellSelected: 'A1',
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            const expression = e.target.value;
            this.setState({expression: expression});
            this.props.updateCellExpression(expression);
        }
    };

    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-container'}>
                    <div className="ui labeled input">
                        <div className="ui label label">{this.props.cellSelected}</div>
                        <input key={this.props.cellSelected} type="text" className="input-box"
                               defaultValue={this.props.expression}
                               onKeyPress={this.handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        );
    }
}