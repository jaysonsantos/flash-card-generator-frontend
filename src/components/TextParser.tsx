import { Button, TextField } from "@material-ui/core";
import * as React from 'react';
import { ITextDealerConfig } from "./Configs";
import { IWordTreeResponse } from "./TextDealer";

interface ITextParserProps {
    configs?: ITextDealerConfig;
    currentText: string;
    handleWordTree(response: IWordTreeResponse): void;
    handleTextChange(currentText: string): void;
}

interface IWordTreeRequest {
    text: string;
    pre_processor?: "ttml2";
}

export default class TextParser extends React.Component<ITextParserProps, {}> {
    public render() {
        const hasConfigs = this.props.configs;
        return (
            <div>
                <TextField multiline={true} value={this.props.currentText} onChange={this.handleChange} />
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
        this.props.handleTextChange(text);
    }

    private handleSubmit = (_: any) => {
        if (!this.props.configs) {
            // Button should be disabled anyway.
            return;
        }

        const url = `${this.props.configs.baseUrl}/v1/build-word-tree/de`;
        const payload: IWordTreeRequest = {
            text: this.props.currentText,
        };
        const request: RequestInit = {
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
            method: 'post'
        };

        fetch(url, request).
            then((response: Response) => response.json()).
            then(this.props.handleWordTree).
            catch(console.log);
    }
}
