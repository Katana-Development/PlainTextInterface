/** @format */

3;
/**
 *  @prettier
 *  @name PlainTextInterface
 *  @license MIT
 *  @publicd
 *  @summary https://github.com/Katana-Development/.git
 *  @author Andrew J Chambers
 *  @file"./index.js"
 *  @fileoverview
 **/

('strict');

const fs = require('fs');
const { O_CREAT, O_RDWR } = fs.constants;
const { Buffer } = require('buffer');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { runInThisContext } = require('vm');

/**
 * @name TextDocument
 * @classdesc Creates an abstraction of a plain-text file, and implements an interface to handle the files data, handle the file as data and to alter or manipulate the file.
 **/
class TextDocument {
    //<|| PUBLIC ||>
    filepath = '/';
    textSz = 0;
    size = 0;

    //<|| PRIVATE ||>
    #fd = 0;
    #permissions = '';
    #stats = {};
    stat = {};
    #text = '';
    #maxTextSz = '';
    #buff;

    /**
     * @constructs TextDocument
     * @param {import('fs').PathLike} filepath
     * @param {number} maxBytes
     * @param {boolean} safeAlgorithm
     */
    constructor(
        filepath = '',
        opts = { permissions: 0o664, addMemory: 1000000, safeBuf: true }
    ) {
        // |> Save Parameterz
        this.filepath = filepath;
        this.#permissions = opts.permissions;

        // |> Opening &/or Creating File then setting file permissions.
        this.#fd = fs.openSync(filepath, O_CREAT | O_RDWR);
        fs.chmodSync(filepath, this.#permissions);

        // |> Handling Memory task, creating Mem-Info access for API users to print.
        this.#stats = fs.statSync(this.filepath);
        this.textSz = this.#stats.size;
        this.#maxTextSz = this.textSz + opts.addMemory;

        // |> Allocating Memory.
        if (opts.safeBuf) this.#buff = Buffer.alloc(this.#maxTextSz);
        else this.#buff = Buffer.allocUnsafe(this.#maxTextSz);

        // |> Reading file, then encoding bianary into UTF-8-Chars.
        fs.readSync(this.#fd, this.#buff);
        this.text = this.#buff.toString('utf8', 0, this.textSz);

        // |> Closing File.
        fs.closeSync(this.#fd);
    }

    get maxTextSz() {
        return this.#maxTextSz;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
    }

    setPermissions() {
        return 0;
    }

    save() {
        return 0;
    }

    setLineLength(maxCharsPerLine = 80) {
        // ==> CONSTANTS
        const text = this.text;
        const lineLen = maxCharsPerLine;

        // >-> VARIABLES
        let altText = '';
        let charCount = lineLen;
        let prevCount = 0;
        let char = '';
        let line = '';

        while (charCount < text.length) {
            while (char != ' ') {
                char = text.charAt(charCount);
                charCount--;
            }

            charCount++;

            line = text.slice(prevCount, charCount);
            altText = altText.concat(line, '\n');

            prevCount = charCount;
            charCount += lineLen;

            console.log(`\nCurrent-Line: ("${line}")\n`);
            console.log(`\nAltered-Text: "${altText}"\n`);
            console.log(`\nCharCount: ${charCount}`);
            console.log(`\nPrevCount: ${prevCount}`);
        }
    }
}

module.exports.TextDocument = TextDocument;
