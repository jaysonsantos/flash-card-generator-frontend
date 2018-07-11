import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import * as wu from "wu";


interface ISideProps {
    text: string;
    active: boolean;
    color: "primary" | "secondary";
    buttonName: string;
    toggleActiveSide(): void;
}

export default class Side extends React.Component<ISideProps, {}> {
    public render(): React.ReactElement<any> {
        const data = this.props.text.split('<br />');
        const phrases = wu(data.slice(1).entries()).map(this.formatPhrases);
        const word = data[0];

        return (
            <Card key={word} hidden={!this.props.active}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {word}
                    </Typography>
                    <Typography variant="subheading">Examples</Typography>
                    <Typography variant="body1">
                        {[...phrases]}
                    </Typography>
                    <CardActions>
                        {this.renderButton()}
                    </CardActions>
                </CardContent>
            </Card>
        );
    }

    private formatPhrases([i, phrase]: [number, string]): React.ReactElement<any> {
        return <div key={i}>{phrase}</div>;
    }

    private renderButton = () => {
        return <Button
            size="small"
            variant="contained"
            color={this.props.color}
            onClick={this.props.toggleActiveSide}>{this.props.buttonName}</Button>;
    }
}
