import { Button, TextField } from "@material-ui/core";
import * as React from 'react';
import { ITextDealerConfig } from "./Configs";
import { IWordTreeResponse } from "./TextDealer";

interface ITextParserProps {
    configs?: ITextDealerConfig;
    handleWordTree(response: IWordTreeResponse): void;
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
        const hasConfigs = this.props.configs;
        return (
            <div>
                <TextField multiline={true} value={this.state.text} onChange={this.handleChange} />
                <Button
                    disabled={!hasConfigs}
                    onClick={this.handleSubmit}>
                    {hasConfigs ? "Parse text" : "Loading configs"}
                </Button>
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        this.setState({ text });
    }

    private handleSubmit = (_: any) => {
        if (!this.props.configs) {
            // Button should be disabled anyway.
            return;
        }

        const url = `${this.props.configs.baseUrl}/v1/build-word-tree/de`;
        const payload: IWordTreeRequest = {
            text: this.state.text,
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
            method: 'post'
        };
        fetch(url, request).
            then((response: Response) => response.json()).
            then(this.props.handleWordTree);
    }
}