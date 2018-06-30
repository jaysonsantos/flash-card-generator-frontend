import { Button } from "@material-ui/core";
import * as React from "react";
import { ITextDealerProps, ITextParserState } from "./TextDealer";


interface ICardGeneratorState {
    generatedCard?: string;
}

interface ICardGeneratorProps extends ITextParserState, ITextDealerProps { };

interface IGenerateCardRequest {
    text: string,
    known_words: string[],
    unkown_words: string[];
}

class CardGenerator extends React.Component<ICardGeneratorProps, ICardGeneratorState> {
    constructor(props: ICardGeneratorProps, state: ICardGeneratorState) {
        super(props, state);
        this.state = {}
    }
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
        if (!this.props.configs) {
            return;
        }
        const url = `${this.props.configs.baseUrl}/v1/generate-flash-card/de`;
        const payload: IGenerateCardRequest = {
            known_words: this.props.knownWords,
            text: this.props.currentText,
            unkown_words: this.props.unknownWords,
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
            method: 'post',
        }
        fetch(url, request).
            then((response: Response) => response.json())
            .then((data: any) => { const c = console; c.log(data) });
    }
}

export default CardGenerator;