import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import * as wu from "wu";


interface ISideProps {
    text: string;
}

export default class Side extends React.Component<ISideProps, {}> {
    public render(): React.ReactElement<any> {
        const data = this.props.text.split('<br />');
        const phrases = wu(data.slice(1).entries()).map(this.formatPhrases);
        const word = data[0];

        return (
            <Card key={word}>
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
