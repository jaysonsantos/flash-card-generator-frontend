import { Button, TextField } from "@material-ui/core";
import * as React from 'react';

interface ITextParserState {
    text: string
}

interface IWordTreeRequest {
    text: string;
    pre_processor?: "ttml2";
}

export default class TextParser extends React.Component<{}, ITextParserState> {
    constructor(props: any, comp: any) {
        super(props, comp);
        this.state = {
            text: "Abc"
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

    private handleWordTreeResponse = (response: Response) => {
        const c = console;
        c.log(response);
    }

    private handleSubmit = (e: any) => {
        const payload: IWordTreeRequest = {
            text: this.state.text,
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            method: 'post'
        };
        fetch("http://localhost:5000/v1/build-word-tree/de", request).then(this.handleWordTreeResponse);
    }
}