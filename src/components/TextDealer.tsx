import * as _ from 'lodash';
import * as React from 'react';
import * as wu from "wu";
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
    unknownWords: Set<string>;
    currentText: string;
    wordTree: WordTreeType;
}

class TextDealer extends React.Component<ITextDealerProps, ITextParserState> {
    constructor(props: ITextDealerProps, state: ITextParserState) {
        super(props, state);
        this.state = {
            currentText: "Hallo! Wie geht es dir? Es geht mir gut und dir?",
            knownWords: new Set([]),
            unknownWords: new Set([]),
            wordTree: new Map(),
        }
    }

    public render() {
        const wordTree = this.renderWordTree();
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
                    knownWords={this.state.knownWords}
                    currentText={this.state.currentText}
                    wordTree={this.state.wordTree}
                    configs={this.props.configs} />
            </>
        )
    }

    private renderWordTree = (): Array<React.ReactElement<any>> => {
        const tree = wu(this.state.wordTree).
            filter(([word, __]) => !this.isWordDecided(word)).
            map(([word, examples]) => <Word
                key={word} word={word} examples={examples}
                addKnownWord={this.addKnownWord}
                addUnknownWord={this.addUnknownWord} />);

        return [...tree];
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

    private addKnownWord = (word: string) => {
        const newWords = [word, ...this.state.knownWords];
        this.setState({ knownWords: new Set(newWords) });
    }

    private addUnknownWord = (word: string) => {
        const newWords = [word, ...this.state.unknownWords];
        this.setState({ unknownWords: new Set(newWords) });
    }

    private isWordDecided = (word: string): boolean => {
        return this.state.knownWords.has(word) ||
            this.state.unknownWords.has(word);
    }
}

export default TextDealer;
