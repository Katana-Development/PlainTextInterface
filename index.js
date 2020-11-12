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


                     <||| [TODO LIST] |||>
   <=<( TODO CREATE )>=> "Create a new error class for FileType Errorz." `
  
   <=<( TODO CREATE )>=> "Create a set range for bufferSize"
  
   <=<( TODO ADD )>=>  Add a maxStorage parameter to TextDocument for setting buffer size
  
   <=<( TODO CREATE )>=> "Create the following methods addText(text), appendText(text), saveFile(), rmFile() and changeFilepath(newFilepath) "






*/

'strict';

const fs = require('fs');
const { extname } = require('path');
const { O_CREAT, O_RDWR } = fs.constants;
const { Buffer } = require('buffer');

const {
   ERR_MSG_FPATH_TYPE,
   ERR_MSG_FPATH_FTYPE
} = require('./constants.json').errorMessages;

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

   constructor(fpath = null) {
      if (typeof fpath != 'string') throw new TypeError(ERR_MSG_FPATH_TYPE);
      if (extname(fpath) != '.txt') throw new Error(ERR_MSG_FPATH_FTYPE);

      this.#fpath = fpath;
      this.#buff = Buffer.alloc(1000000);
      this.#fd = fs.openSync(this.#fpath);
      this.#stat = fs.statSync(this.#fpath);

      const testObj = {
         fpath: this.#fpath,
         fd: this.#fd,
         fileSz: this.#stat.size
      };
      this.#text = '';
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
      let charCount = lineLen;
      let prevCount = 0;
      let line = '';

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
