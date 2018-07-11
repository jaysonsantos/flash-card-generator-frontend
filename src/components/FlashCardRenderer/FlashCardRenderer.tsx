import * as React from "react";
import * as wu from "wu";
import Side from "./Sides";

interface IFlashCardRendererProps {
    generatedText: string;
}

export default class FlashCardRenderer extends React.Component<IFlashCardRendererProps, {}> {
    private regex = new RegExp(/.[^<]*/);

    public render() {
        const flashCards = this.renderFlashCards();
        return (
            <>
                Here are them
                {flashCards}
            </>
        );
    }

    private renderFlashCards = (): Array<React.ReactElement<any>> => {
        const cards = wu(this.props.generatedText.trim().split('\n')).map(this.renderFlashCardSides);
        return [...cards];
    }

    private renderFlashCardSides = (line: string): React.ReactElement<any> => {
        const s = wu(line.split('\t').entries()).map(([i, text]) => <Side key={i} text={text} />);
        const sides = [...s];
        const match = line.match(/.[^<]*/);
        if (!match) {
            throw new Error(`Line didn't have proper tags "${line}"`);
        }
        if (sides.length !== 2) {
            throw new Error(`Line didn't have two sides flash card`);
        }
        const key = match[0];
        return (
            <div key={key}>
                {sides}
            </div>
        );
    }
}
