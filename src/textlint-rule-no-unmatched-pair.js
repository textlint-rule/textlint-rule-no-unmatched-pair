// MIT © 2018 azu
import { splitAST, Syntax as SentenceSyntax } from "sentence-splitter";
import { PairMaker } from "./parser/PairMaker.js";
import { SourceCode } from "./parser/SourceCode.js";

const report = context => {
    const { Syntax, report, RuleError } = context;
    return {
        [Syntax.Paragraph](node) {
            const sentences = splitAST(node);
            sentences.children.filter(node => node.type === SentenceSyntax.Sentence).forEach(sentence => {
                const source = new SourceCode(sentence.raw);
                const pairMaker = new PairMaker();
                while (source.canRead) {
                    pairMaker.mark(source);
                    source.peek();
                }
                // Report Error for each existing context keys
                source.contextLocations.forEach((contextLocation) => {
                    report(node, new RuleError(`Not found pair character for ${contextLocation.pairMark.start}.
                    
You should close this sentence with ${contextLocation.pairMark.end}.
This pair mark is called ${contextLocation.pairMark.key}.`, {
                        index: contextLocation.index
                    }));
                });
                if (source.contextLocations.length > 0) {

                }
            });
        }
    };
};

module.exports = report;
