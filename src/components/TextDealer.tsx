import * as React from 'react';
import TextParser from './TextParser';

class TextDealer extends React.Component {
    public knownWords: string[];
    public unknownWords: string[];

    public render() {
        return (
            <div>
                <TextParser />
            </div>
        )
    }
}

export default TextDealer;