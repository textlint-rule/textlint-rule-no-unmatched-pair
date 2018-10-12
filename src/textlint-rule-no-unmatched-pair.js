// MIT © 2018 azu
import { splitAST, Syntax as SentenceSyntax } from "sentence-splitter";
import { PairMaker } from "./parser/PairMaker.js";
import { SourceCode } from "./parser/SourceCode.js";
import { IgnoreNodeManager } from "textlint-rule-helper";

const report = context => {
    const { Syntax, report, RuleError } = context;
    const ignoreNodeManager = new IgnoreNodeManager();
    return {
        [Syntax.Paragraph](node) {
            const sentences = splitAST(node);
            ignoreNodeManager.ignoreChildrenByTypes(node, [Syntax.Code]);
            sentences.children.filter(node => node.type === SentenceSyntax.Sentence).forEach(sentence => {
                const source = new SourceCode(sentence.raw);
                const pairMaker = new PairMaker();
                while (source.canRead) {
                    pairMaker.mark(source);
                    source.peek();
                }
                // Report Error for each existing context keys
                source.contextLocations.forEach((contextLocation) => {
                    if (ignoreNodeManager.isIgnoredIndex(node.range[0] + contextLocation.index)) {
                        return;
                    }
                    report(node, new RuleError(`Not found pair character for ${contextLocation.pairMark.start}.
                    
You should close this sentence with ${contextLocation.pairMark.end}.
This pair mark is called ${contextLocation.pairMark.key}.`, {
                        index: contextLocation.index
                    }));
                });
            });
        }
    };
};

module.exports = report;
