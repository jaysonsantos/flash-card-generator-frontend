import { Button, Card, Typography } from "@material-ui/core";
import * as React from "react";

interface IWordProps {
    word: string;
    examples: string[];
    addKnownWord(word: string): void;
    addUnknownWord(word: string): void;
}

class Word extends React.Component<IWordProps, {}> {
    public render() {
        return (
            <Card>
                <Typography color="textSecondary">
                    Do you know this word?
                </Typography>
                <Typography variant="headline" component="h2">
                    {this.props.word}
                </Typography>
                <Typography component="p">
                    Examples
                </Typography>
                {this.renderExamples(this.props.examples)}
                <Button size="small" variant="contained" color="primary" onClick={this.addKnownWord}>Yes</Button>
                <Button size="small" variant="contained" color="secondary" onClick={this.addUnknownWord}>No</Button>
            </Card>
        );
    }

    private renderExamples(examples: string[]) {
        return examples.map((example, index) => {
            return (
                <Typography key={index} component="p">
                    {example}
                </Typography>
            );
        });
    }

    private addKnownWord = (_: any) => {
        this.props.addKnownWord(this.props.word);
    }

    private addUnknownWord = (_: any) => {
        this.props.addUnknownWord(this.props.word);
    }
}

export default Word;