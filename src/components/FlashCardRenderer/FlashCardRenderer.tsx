import * as React from "react";
import * as wu from "wu";
import Sides from "./Sides";

interface IFlashCardRendererProps {
    generatedText: string;
}

export default class FlashCardRenderer extends React.Component<IFlashCardRendererProps, {}> {
    private wordRegex = new RegExp(/.[^<]*/);

    public render() {
        const flashCards = this.renderFlashCards();
        return (
            <>
                {flashCards}
            </>
        );
    }

    private renderFlashCards = (): Array<React.ReactElement<any>> => {
        const cards = wu(this.props.generatedText.trim().split('\n')).map(this.renderFlashCardSides);
        return [...cards];
    }

    private renderFlashCardSides = (line: string): React.ReactElement<any> => {
        const match = line.match(this.wordRegex);
        if (!match) {
            throw new Error(`Line didn't have proper tags "${line}"`);
        }
        const word = match[0];
        return <Sides key={word} word={word} line={line} />;
    }
}
