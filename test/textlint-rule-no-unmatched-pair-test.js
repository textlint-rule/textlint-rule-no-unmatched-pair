// MIT © 2018 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-no-unmatched-pair.js");
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-unmatched-pair", rule, {
    valid: [
        "これは(秘密)です。",
        `John said "Hello World!".`,
        "`(` is ok.", "文字列リテラルには3種類ありますが、まずは`\"`（ダブルクオート）と`'`（シングルクオート）について見ていきます。",
        `a is b.
        
\`"\`（ダブルクオート）と\`'\`（シングルクオート）に意味的な違いはありません。
この書籍では、\`"\`（ダブルクオート）を主に文字列リテラルとして利用します。`
    ],
    invalid: [
        {
            text: "これは（秘密)です。",
            errors: [
                {
                    index: 4,
                    message: `Not found pair character for （.
                    
You should close this sentence with ）.
This pair mark is called 丸括弧（）.`
                }
            ]
        },
        {
            text: `John said "Hello World!'.`,
            errors: [
                {
                    index: 11,
                    message: `Not found pair character for ".
                    
You should close this sentence with ".
This pair mark is called double quote.`
                }
            ]
        },
        {
            text: "`src/App.js`にファイルを作成し、次のような内容のJavaScriptモジュールとします。\n"
                + "モジュールは、基本的には何かしらを外部に公開(`export`）します。",
            errors: [
                {
                    index: 23
                }
            ]
        }
    ]
});

