import { Button, TextField } from "@material-ui/core";
import * as React from 'react';

interface ITextParserProps {
    handleWordTree(e: Response): void;
}

interface ITextParserState {
    text: string
}

interface IWordTreeRequest {
    text: string;
    pre_processor?: "ttml2";
}

export default class TextParser extends React.Component<ITextParserProps, ITextParserState> {
    constructor(props: ITextParserProps, comp: ITextParserState) {
        super(props, comp);
        this.state = {
            text: "Hallo! Wie geht es dir?"
        };
    }

    public render() {
        return (
            <div>
                <TextField multiline={true} value={this.state.text} onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}>Parse text</Button>
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: e.target.value });
    }
    private handleSubmit = (e: any) => {
        const payload: IWordTreeRequest = {
            text: this.state.text,
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            headers: {"content-type": "application/json"},
            method: 'post'
        };
        fetch("http://localhost:8000/v1/build-word-tree/de", request).then(this.props.handleWordTree);
    }
}