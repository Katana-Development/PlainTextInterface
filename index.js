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

'strict';

/**
 *  @prettier
 *  @name
 *  @license MIT
 *  @public
 *  @summary https://github.com/Katana-Development/.git
 *  @author Andrew J Chambers
 *  @file"./"
 *  @fileoverview
 **/

'strict';

const fs = require('fs');
const {O_CREAT, O_RDWR} = fs.constants;

class PlainTextDocument {
    constructor(filepath, maxMemorySz = 880000, fperms = 775) {
        const buf = Buffer.alloc(maxMemorySz);
        const fd = fs.openSync(filepath, O_CREAT, O_RDWR);

        fs.chmodSync(filepath, fperms);
        fs.readSync(fd, buf);

        this.filepath = filepath;
        this.memSz = maxMemorySz;
        this.stat = fs.statSync(filepath);
        this._text = '';
        this.text = buf.toString('utf-8');

        fs.closeSync(fd);
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
    }
}

module.exports.PlainTextDocument = PlainTextDocument;
