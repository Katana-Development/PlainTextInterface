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

/*
   
  -->                                <|[TODO LIST]|>                                <--
  ||> --------------------------------------^-------------------------------------- <||
   <=<( TODO CREATE )>=> "Create a new error class for FileType Errorz." `
   
   <=<( TODO CREATE )>=> "Create the following methods addText(text), appendText(text), saveFile(), rmFile() and changeFilepath(newFilepath) "
   
   <=<( TODO CREATE )>=> "Test the maxStorage RangeErrors, and proof-read the their messages";





*/

'strict';

const fs = require('fs');
const { extname } = require('path');
const { O_CREAT, O_RDWR } = fs.constants;
const { Buffer } = require('buffer');

const {
   E_MSG_FPATH_FTYP,
   E_MSG_FPATH_TYP,
   E_MSG_RNG_MAX,
   E_MSG_RNG_MIN
} = require('./constants.json').errorMessages;
const {
   TXTDOC_MAX_BYTES,
   TXTDOC_MIN_BYTES
} = require('./constants.json').numericConstants;

/**
 * @name TextDocument
 * @classdesc Creates an abstraction of a plain-text file, and implements an interface to handle the files data, handle the file as data and to alter or manipulate the file.
 **/
class TextDocument {
   #fpath;
   #buff;
   #fd;
   #stat;
   #text;

   constructor(fpath = null, maxStorage = 1000000) {
      const bytes = maxStorage;
      this.#fpath = fpath;

      if (typeof this.#fpath != 'string') {
         throw new TypeError(E_MSG_FPATH_TYP);
      }

      if (extname(this.#fpath) != '.txt') {
         throw new Error(E_MSG_FPATH_FTYP);
      }

      if (bytes > TXTDOC_MAX_BYTES) {
         throw new RangeError(E_MSG_RNG_MAX);
      } else if (bytes < TXTDOC_MIN_BYTES) {
         bytes = TXTDOC_MIN_BYTES;
      }

      this.#fd = fs.openSync(this.#fpath);
      this.#stat = fs.statSync(this.#fpath);
      this.#buff = Buffer.alloc(1000000);

      fs.chmodSync(fpath, 0o664);
      fs.readSync(this.#fd, this.#buff, { length: this.#stat.size });

      this.text = this.#buff.toString('utf-8');
   }

   get text() {
      return this.#text;
   }

   set text(text) {
      this.#text = text;
   }

   setLineLength(maxCharsPerLine = 80) {
      const text = this.text;
      const lineLen = maxCharsPerLine;

      let altText = '';
      let line = '';
      let prevCount = 0;
      let charCount = lineLen;

      while (charCount <= text.length) {
         while (text.charAt(charCount) != ' ') {
            charCount--;
         }

         charCount++;
         line = text.slice(prevCount, charCount);
         altText = altText.concat(line, '\n');

         prevCount = charCount;
         charCount += lineLen;

         console.log(`\nCurrent-Line: ("${line}")\n`);
         console.log(`\nAltered-Text: \n${altText}`);
         console.log(`\nCharCount: ${charCount}`);
         console.log(`\nPrevCount: ${prevCount}`);
         console.log(`\nOrginal Text Length: ${text.length}`);
      }

      var lastLineLen = text.length - charCount + lineLen;

      console.log(`\nLast Line Length: ${lastLineLen}`);

      var lastLine = text.slice(prevCount, prevCount + lastLineLen);
      console.log(`\nLast Line: ${lastLine}`);
      altText = altText.concat(lastLine);
      console.log(altText);

      return altText;
   }
}

module.exports.TextDocument = TextDocument;
