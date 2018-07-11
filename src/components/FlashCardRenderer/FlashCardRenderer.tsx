import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
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

    private renderFlashCard = ([i, text]: [number, string]): React.ReactElement<any> => {
        const data = text.split('<br />');
        const phrases = wu(data.slice(1).entries()).map(this.formatPhrases);
        const word = data[0];
        const key = `${word}-${i}`;

        return (
            <Card key={key}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {word}
                    </Typography>
                    <Typography variant="subheading">Examples</Typography>
                    <Typography variant="body1">
                        {[...phrases]}
                    </Typography>
                    <CardActions>
                        <Button size="small" variant="contained" color="primary">Flip</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }

    private formatPhrases([i, phrase]: [number, string]): React.ReactElement<any> {
        return <div key={i}>{phrase}</div>;
    }
}
