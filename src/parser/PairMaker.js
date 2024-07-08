/**
 * Mark pair character
 * PairMarker aim to mark pair string as a single sentence.
 *
 * For example, Following sentence has two period(。). but it should treat a single sentence
 *
 * > I hear "I'm back to home." from radio.
 *
 * https://ja.wikipedia.org/wiki/%E6%8B%AC%E5%BC%A7
 */
/**
 * @typedef {{key:string,start:string,end:string,reverseInRtl:boolean}[]} PairMark
 */
const PAIR_MARKS = [
    {
        key: "double quote",
        start: `"`,
        end: `"`
    },
    {
        key: "angled bracket[]",
        start: `[`,
        end: `]`
    },
    {
        key: "round bracket()",
        start: `(`,
        end: `)`
    },
    {
        key: "curly brace{}",
        start: `{`,
        end: `}`
    },
    {
        key: "かぎ括弧「」",
        start: `「`,
        end: `」`
    },
    {
        key: "丸括弧（）",
        start: `（`,
        end: `）`
    },
    {
        key: "二重かぎ括弧『』",
        start: `『`,
        end: `』`
    },
    {
        key: "波括弧｛｝",
        start: `｛`,
        end: `｝`
    },
    {
        key: "角括弧［］",
        start: `［`,
        end: `］`
    },
    {
        key: "重角括弧〚〛",
        start: `〚`,
        end: `〛`
    },
    {
        key: "隅付き括弧【】",
        start: `【`,
        end: `】`
    },
    {
        key: "double guillemet «»",
        start: "«",
        end: "»"
    },
    {
        key: "single guillemet ‹›",
        start: "‹",
        end: "›"
    },
    {
        key: "ornate parenthesis ﴾﴿",
        start: "﴾",
        end: "﴿",
        reverseInRtl: true
    }
];

// create entries
// [start.key, mark]
// [end.key, mark]
const PAIR_MARKS_ENTRIES = (rtl) =>
    PAIR_MARKS.map((mark) => {
        const newMark = Object.assign({}, mark);
        if (rtl && newMark.reverseInRtl) {
            [newMark.start, newMark.end] = [newMark.end, newMark.start];
        }

        return [
            [newMark.start, newMark],
            [newMark.end, newMark]
        ];
    }).flat(1);

/**
 * Optimized Map
 * @type Map<string, {key:string,start:string,end:string,reverseInRtl:boolean}>
 */
const createPairMarksKeyMap = (rtl) => new Map(PAIR_MARKS_ENTRIES(rtl));
const matchPair = (string, rtl) => {
    const PAIR_MARKS_KEY_Map = createPairMarksKeyMap(rtl);
    return PAIR_MARKS_KEY_Map.get(string);
};
// For readme
// console.log(PAIR_MARKS.map(pair => `- ${pair.key}: \`${pair.start}\` and \`${pair.end}\``).join("\n"));
export class PairMaker {
    /**
     * @param {import("./SourceCode").SourceCode} sourceCode
     * @param {boolean} rtl
     * @returns
     */
    mark(sourceCode, rtl) {
        const string = sourceCode.read();
        if (!string) {
            return;
        }

        const matchedPair = matchPair(string, rtl);
        if (!matchedPair) {
            return;
        }
        // support nested pair
        // {"{test}"}
        if (sourceCode.isInContext(matchedPair)) {
            // check that string is end mark?
            const pair = PAIR_MARKS.find((pair) => (rtl && pair.reverseInRtl ? pair.start : pair.end === string));
            if (pair) {
                sourceCode.leaveContext(pair);
            }
        } else {
            const pair = PAIR_MARKS.find((pair) => (rtl && pair.reverseInRtl ? pair.end : pair.start === string));
            if (pair) {
                sourceCode.enterContext(pair);
            }
        }
    }
}
