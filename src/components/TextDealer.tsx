import * as _ from 'lodash';
import * as React from 'react';
import { ITextDealerConfig } from './Configs';
import TextParser from './TextParser';
import Word from './Word';

interface ITextDealerProps {
    configs?: ITextDealerConfig;
}

type WordTreeType = Map<string, string[]>;

export interface IWordTreeResponse {
    word_tree: WordTreeType
}

export interface ITextParserState {
    knownWords: string[]; // Use a set to be faster?
    unknownWords: string[]; // Use a set to be faster?
    wordTree: WordTreeType;
}

class TextDealer extends React.Component<ITextDealerProps, ITextParserState> {
    constructor(props: ITextDealerProps, state: ITextParserState) {
        super(props, state);
        this.state = {
            knownWords: [],
            unknownWords: [],
            wordTree: new Map(),
        }
    }

    public render() {
        const wordTree: Array<React.ReactElement<any>> = [];
        let i = 0;
        this.state.wordTree.forEach((examples, word) => {
            if (this.isWordDecided(word)) {
                return;
            }
            wordTree.push(<Word
                key={i++} word={word} examples={examples}
                addKnownWord={this.addKnownWord}
                addUnknownWord={this.addUnknownWord} />);
        });
        // const reduceWord = (words: Array<React.ReactElement<any>>, word: string, examples: string[]) => {
        //     words.push(<Word key={words.length} word={word} examples={examples} />);
        //     return words;
        // };
        // const wordTree = _.reduce(this.state.wordTree, reduceWord, new Array());
        return (
            <>
                <TextParser
                    handleWordTree={this.handleWordTree}
                    configs={this.props.configs} />
                {wordTree}
            </>
        )
    }

    private handleWordTree = (response: IWordTreeResponse) => {
        const treeReducer = (map: Map<string, string[]>, key: string) => {
            return map.set(key, response.word_tree[key]);
        };
        const wordTree = _.keys(response.word_tree).
            reduce(treeReducer, new Map());
        this.setState({ wordTree });
    }

    private addKnownWord = (word: string) => {
        const words = this.state.knownWords.slice();
        words.push(word);
        this.setState({ knownWords: words });
    }

    private addUnknownWord = (word: string) => {
        const words = this.state.unknownWords.slice();
        words.push(word);
        this.setState({ unknownWords: words });
    }

    private isWordDecided = (word: string): boolean => {
        return this.state.knownWords.indexOf(word) >= 0 ||
            this.state.unknownWords.indexOf(word) >= 0;
    }
}

export default TextDealer;