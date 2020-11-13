/**
 *  @prettier
 *  @name PLAIN_TEXT_INTERFACE
 *  @author Andrew J Chambers
 *  @file ./index.js
 *  @fileoverview "The Main-File of Module PlainTextInterface."
 *  @summary https://github.com/Katana-Development/PlainTextInterface.git
 *  @license MIT
 **/

'strict';

const fs = require('fs');
const { O_CREAT, O_RDWR, O_TRUNC, O_WRONLY } = fs.constants;

class TextDocument {
   #fpath;
   #text;

   constructor(fpath) {
      this.#fpath = fpath;

      var fsize = fs.statSync(this.#fpath).size;
      var fd = fs.openSync(fpath, O_CREAT | O_RDWR);
      var buf = Buffer.allocUnsafe(fsize);

      fs.readSync(fd, buf, { offset: 0, length: fsize, position: 0 });
      fs.closeSync(fd);

      this.text = buf.toString('utf8', 0, fsize);
   }

   save() {
      var buf = Buffer.from(this.text);
      var fd = fs.openSync(this.#fpath, O_TRUNC | O_WRONLY);
      var result = fs.writeSync(fd, buf, 0, this.text.length, 0);

      fs.closeSync(fd);

      return result;
   }

   set text(text) {
      this.#text = text;
   }

   get text() {
      return this.#text;
   }
}

module.exports.TextDocument = TextDocument;
