import * as React from "react";
import * as wu from "wu";
import Side from "./Side";

interface ISidesProps {
    word: string;
    line: string;
}

interface ISidesState {
    activeSide: number
}

export default class Sides extends React.Component<ISidesProps, ISidesState> {
    private sidesConfigs = {
        0: { opposite: 1, color: "primary", buttonName: "Show back card" },
        1: { opposite: 0, color: "secondary", buttonName: "Show front card" },
    }
    public constructor(props: ISidesProps, state: ISidesState) {
        super(props, state);
        this.state = {
            activeSide: 0
        }
    }
    public render(): React.ReactElement<any> {
        const s = wu(this.props.line.split('\t').entries()).map(([i, text]) => {
            const configs = this.sidesConfigs[i];
            return <Side
                key={i} text={text} active={this.state.activeSide === i}
                toggleActiveSide={this.toggleActiveSide}
                color={configs.color} buttonName={configs.buttonName} />;
        });
        const sides = [...s];

        if (sides.length !== 2) {
            throw new Error(`Line didn't have two sides flash card`);
        }

        return (
            <div key={this.props.word}>
                {sides}
            </div>
        );
    }

    private toggleActiveSide = () => {
        this.setState({ activeSide: this.sidesConfigs[this.state.activeSide].opposite });
    }
}
