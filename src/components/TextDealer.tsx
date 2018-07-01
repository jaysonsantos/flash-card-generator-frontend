import * as _ from 'lodash';
import * as React from 'react';
import CardGenerator from './CardGenerator';
import { ITextDealerConfig } from './Configs';
import TextParser from './TextParser';
import Word from './Word';

export interface ITextDealerProps {
    configs?: ITextDealerConfig;
}

type WordTreeType = Map<string, string[]>;

export interface IWordTreeResponse {
    word_tree: WordTreeType
}

export interface ITextParserState {
    knownWords: Set<string>;
    knownWordsLength: number;
    unknownWords: Set<string>;
    unknownWordsLength: number;
    currentText: string;
    wordTree: WordTreeType;
}

class TextDealer extends React.Component<ITextDealerProps, ITextParserState> {
    constructor(props: ITextDealerProps, state: ITextParserState) {
        super(props, state);
        this.state = {
            currentText: "Hallo! Wie geht es dir?",
            knownWords: new Set([]),
            knownWordsLength: 0,
            unknownWords: new Set([]),
            unknownWordsLength: 0,
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
                    currentText={this.state.currentText}
                    handleWordTree={this.handleWordTree}
                    handleTextChange={this.handleTextChange}
                    configs={this.props.configs} />
                {wordTree}
                <CardGenerator
                    unknownWords={this.state.unknownWords}
                    unknownWordsLength={this.state.unknownWordsLength}
                    knownWords={this.state.knownWords}
                    knownWordsLength={this.state.knownWordsLength}
                    currentText={this.state.currentText}
                    wordTree={this.state.wordTree}
                    configs={this.props.configs} />
            </>
        )
    }

    private handleTextChange = (currentText: string) => {
        this.setState({ currentText });
    }

    private handleWordTree = (response: IWordTreeResponse) => {
        const treeReducer = (map: Map<string, string[]>, key: string) => {
            return map.set(key, response.word_tree[key]);
        };
        const wordTree = _.keys(response.word_tree).
            reduce(treeReducer, new Map());
        this.setState({ wordTree });
    }

    private copySet<T>(set: Set<T>): T[] {
        const output: T[] = new Array();
        for (const key of set.keys()) {
            output.push(key)
        }
        return output;
    }

    private addKnownWord = (word: string) => {
        const oldWords = this.copySet(this.state.knownWords)
        const words = new Set(oldWords);
        words.add(word);
        this.setState({ knownWords: words, knownWordsLength: this.state.knownWordsLength + 1 });
    }

    private addUnknownWord = (word: string) => {
        const oldWords = this.copySet(this.state.unknownWords)
        const words = new Set(oldWords);
        words.add(word);
        this.setState({ unknownWords: words, unknownWordsLength: this.state.unknownWordsLength + 1 });
    }

    private isWordDecided = (word: string): boolean => {
        return this.state.knownWords.has(word) ||
            this.state.unknownWords.has(word);
    }
}

export default TextDealer;