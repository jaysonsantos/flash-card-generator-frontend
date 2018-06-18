import { Button, TextField } from "@material-ui/core";
import * as React from 'react';

class TextParser extends React.Component {
    constructor(props: any, comp: any) {
        super(props, comp);
        this.state = {
            text: ""
        };
    }
    public render() {
        return (
            <div>
                <TextField multiline={true} value="ae" />
                <Button>Parse text</Button>
            </div>
        );
    }
}

export default TextParser;