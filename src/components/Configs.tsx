import * as React from "react";

export interface ITextDealerConfig {
    baseUrl: string
}

interface IConfigState {
    configs?: ITextDealerConfig
}

export class Configs extends React.Component<{}, IConfigState> {
    public componentWillMount() {
        fetch("/configs.json").then((response: Response) => {
            return response.json();
        }).then((configs: ITextDealerConfig) => {
            this.setState({ configs })
        });
    }

    public render() {
        const children = this.props.children;
        if (children && this.state) {
            return React.cloneElement(children as any, { configs: this.state.configs });
        }

        return <>{children}</>;
    }

}