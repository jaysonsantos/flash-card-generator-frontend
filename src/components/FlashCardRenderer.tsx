import { Card, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import * as wu from "wu";

interface IFlashCardRendererProps {
    generatedText: string;
}

export default class FlashCardRenderer extends React.Component<IFlashCardRendererProps, {}> {
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
        const s = wu(line.split('\t').entries()).map(this.renderFlashCard);
        const match = line.match(/.[^<]*/);
        if (!match) {
            throw new Error(`Line didn't have proper tags "${line}"`);
        }
        const key = match[0];
        const slides = [...s];
        return (
            <React.Fragment key={key}>
                {slides}
            </React.Fragment>
        );
    }

    private renderFlashCard = ([i, text]: [number, string]): React.ReactElement<any> => {
        const data = text.split('<br />');
        const phrases = wu(data.slice(1).entries()).map(this.formatPhrases);

        return (
            <Card key={i}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {[...phrases]}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    private formatPhrases([i, phrase]: [number, string]): React.ReactElement<any> {
        return <div key={i}>{phrase}</div>;
    }
}
