import { Button, Fade } from "@material-ui/core";
import * as React from "react";
import FlashCardRenderer from "./FlashCardRenderer";
import { ITextDealerProps, ITextParserState } from "./TextDealer";


interface ICardGeneratorState {
    generatedCard?: string;
}

interface ICardGeneratorProps extends ITextParserState, ITextDealerProps { };

interface IGenerateCardRequest {
    text: string,
    known_words: string[],
    unknown_words: string[];
}

interface IGenerateCardResponse {
    text: string
}

class CardGenerator extends React.Component<ICardGeneratorProps, ICardGeneratorState> {
    constructor(props: ICardGeneratorProps, state: ICardGeneratorState) {
        super(props, state);
        this.state = {
            generatedCard: "gehen<br />Wie geht es dir?<br />Es geht mir gut und dir?\tgo<br />How are you?<br />I'm fine and you?\n"
        }
    }

    public render() {
        return (
            <Fade in={this.props.unknownWords.size > 0}>
                <div>
                    Known words: {this.props.knownWords.size}<br />
                    Unknown words: {this.props.unknownWords.size}
                    <Button
                        onClick={this.generateCard}
                        disabled={!this.canGenerateCard}>
                        Generate card
                    </Button>
                    <div hidden={!this.state.generatedCard}>{this.renderFlashCard()}</div>
                </div>
            </Fade>
        );
    }

    private generateCard = (_: any) => {
        if (!this.props.configs) {
            return;
        }
        const url = `${this.props.configs.baseUrl}/v1/generate-flash-card/de`;
        const payload: IGenerateCardRequest = {
            known_words: [...this.props.knownWords],
            text: this.props.currentText,
            unknown_words: [...this.props.unknownWords],
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
            method: 'post',
        }
        fetch(url, request).
            then((response: Response) => response.json())
            .then((data: IGenerateCardResponse) => { this.setState({ generatedCard: data.text }) });
    }

    private get canGenerateCard(): boolean {
        return this.props.unknownWords.size > 0 &&
            this.props.currentText.replace(/\W/g, '') !== "";
    }

    private renderFlashCard = () => {
        if (this.state.generatedCard) {
            return <FlashCardRenderer generatedText={this.state.generatedCard} />;
        }

        return <></>;
    }
}

export default CardGenerator;
