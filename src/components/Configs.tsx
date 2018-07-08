import { Button } from "@material-ui/core";
import * as React from "react";

export interface ITextDealerConfig {
    baseUrl: string
}

interface IConfigState {
    configs?: ITextDealerConfig
    error?: any
}

export class Configs extends React.Component<{}, IConfigState> {
    public componentWillMount() {
        this.loadConfigs();
    }

    public render() {
        if (this.state && this.state.error) {
            return (<div>
                <h3>Error loading config</h3>
                <h4>{this.state.error.toString()}</h4>
                <Button onClick={this.loadConfigs}>Reload</Button>
            </div>);
        }
        const children = this.props.children;
        if (children && this.state) {
            return React.cloneElement(children as any, { configs: this.state.configs });
        }

        return <>{children}</>;
    }

    private loadConfigs = () => {
        fetch("/configs.json").then((response: Response) => {
            return response.json();
        }).then((configs: ITextDealerConfig) => {
            this.setState({ configs, error: null })
        }).catch(e => {
            this.setState({ error: e });
        });
    }
}
