import { Button } from "@material-ui/core";
import * as React from "react";
import { ITextParserState } from "./TextDealer";


interface ICardGeneratorState {
    generatedCard: string;
}

class CardGenerator extends React.Component<ITextParserState, ICardGeneratorState> {
    public render() {
        return (
            <React.Fragment>
                Known words: {this.props.knownWords.length}
                Unknown words: {this.props.unknownWords.length}
                <Button onClick={this.generateCard}>Generate card</Button>
                <div hidden={!this.state.generatedCard}>{this.state.generatedCard}></div>
            </React.Fragment>
        );
    }

    private generateCard = (_: any) => {
        const url = `${this.props.configs.baseUrl}/v1/generate-flash-card/de`;
    }
}

export default CardGenerator;