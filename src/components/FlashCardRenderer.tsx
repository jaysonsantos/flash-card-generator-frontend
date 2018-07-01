import * as React from "react";
import { Card } from "@material-ui/core";

interface IFlashCardRendererProps {
    generatedText: string;
}

export default class FlashCardRenderer extends React.Component<IFlashCardRendererProps, {}> {
    public render() {
        const flashCards = this.renderFlashCards();
        return (
            { flashCards }
        );
    }

    private renderFlashCards = (): Array<Array<React.ReactElement<any>>> => {
        return this.props.generatedText.split('\n').map(this.renderFlashCardSides);
    }

    private renderFlashCardSides = (line: string): Array<React.ReactElement<any>> => {
        return line.split('\t').map(this.renderFlashCard);
    }

    private renderFlashCard = (text: string, index: number): React.ReactElement<any> => {
        return (
            <Card>
                {text}
            </Card>
        );
    }
}