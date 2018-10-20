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
この書籍では、\`"\`（ダブルクオート）を主に文字列リテラルとして利用します。`,
        `そのため、Todoアイテムの状態を更新するには、HTML要素にTodoアイテムの情報（タイトルや識別子となるidなど）をすべて埋め込む必要があります。
しかし、HTML要素に対して文字列しか埋め込めないため、Todoアイテムのデータを文字列にしないといけないという制限が発生します。

また操作と表示が1対1で更新される場合、1つの操作に対して複数の箇所の表示が更新されることもあります。
今回のTodoアプリでもTodoリスト（\`#js-todo-list\`）とTodoアイテム数（\`#js-todo-count\`）の2箇所を更新する必要があることからも分かります。
`, `\`Object.assign\`メソッドは、\`target\`オブジェクトに対して、1つ以上の\`sources\`オブジェクトを指定します。
\`sources\`オブジェクト自身がもつ列挙可能なプロパティを第一引数の\`target\`オブジェクトに対してコピーします。
\`Object.assign\`メソッドの返り値は、\`target\`オブジェクトになります。`
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
                    index: 74
                }
            ]
        }, {
            text: `このように\`count\`変数が自動解放されずに保持できているのは「（\`increment\`）関数が外側のスコープにある（\`count\`）変数への参照を保持できる」ためです。このような性質のことをクロージャー(関数閉包）と呼びます。クロージャーは静的スコープと変数は参照され続けていればデータは保持されるという2つの性質によって成り立っています。`,
            errors: [
                {
                    line: 1,
                    column: 105,
                    index: 104
                }
            ]
        },{
            text: `DUMMY DUUMY.
            
            
このように\`count\`変数が自動解放されずに保持できているのは「（\`increment\`）関数が外側のスコープにある（\`count\`）変数への参照を保持できる」ためです。このような性質のことをクロージャー(関数閉包）と呼びます。クロージャーは静的スコープと変数は参照され続けていればデータは保持されるという2つの性質によって成り立っています。`,
            errors: [
                {
                    line: 4,
                    column: 105
                }
            ]
        }
    ]
});

