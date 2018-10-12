// MIT © 2018 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-no-unmatched-pair.js");
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-unmatched-pair", rule, {
    valid: [
        {
            text: "これは(秘密)です。"
        },
        {
            text: `John said "Hello World!".`
        }
    ],
    invalid: [
        {
            text: "これは（秘密)です。",
            errors: [
                {
                    index: 4,
                    message: `Not found pair character for （.
                    
You should close this sentence with ）.
This pair mark is called round bracket（）.`
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
        }
    ]
});

