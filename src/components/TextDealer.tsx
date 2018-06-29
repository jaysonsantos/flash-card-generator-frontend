import * as React from 'react';
import TextParser from './TextParser';

class TextDealer extends React.Component {
    public knownWords: string[];
    public unknownWords: string[];

    public render() {
        return (
            <div>
                <TextParser handleWordTree={this.handleWordTree}/>
            </div>
        )
    }

    private handleWordTree = (e: Response) => {
        const c = console;
        c.log(e);
    }
}

export default TextDealer;