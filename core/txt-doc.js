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

//  |TODO TEST| ||> Test All of the Exceptions you added Ajay.
//  |TODO ADD| ||> Add error handling for max-filesize.

const fs = require('fs');
const path = require('path');
const { O_CREAT, O_RDWR } = fs.constants;
const { Buffer } = require('buffer');
const { E_PRAM_PERMIS_TYPE } = require('./lib/cnst.json');

/**
 * @name TextDocument
 * @classdesc Creates an abstraction of a plain-text file, and implements an interface to handle the files data, handle the file as data and to alter or manipulate the file.
 **/
class TextDocument {
   // <|| PUBLIC ||>

   // <|| PRIVATE ||>
   #fd;
   #buf;
   #text;
   #filepath;
   #maxMemory;
   #filePermis;
   #stats;

   /**
    * @constructs TextDocument
    * @param {import('fs').PathLike} filepath
    * @param {number} maxBytes
    * @param {boolean} safeAlgorithm
    */
   constructor(filepath = '', filePermis = 0o664, maxMemory = 1280000) {
      this.#filepath = filepath;
      this.#filePermis = filePermis;
      this.#maxMemory = maxMemory;

      var flag = {
         errFilepath_dataType: false,
         errFilepath_fileType: false,
         errFileSize_outaRange: false
      };

      try {
         if (maxMemory > 4194304) {
            throw new RangeError();
         }

         if (typeof filepath != 'string') {
            flag.errFilepath_dataType = true;

            throw new TypeError();
         } // * e

         if (path.extname(filepath) != '.txt') {
            flag.errFilepath_fileType = true;

            throw new SyntaxError();
         } // * e

         this.#fd = fs.openSync(filepath, O_CREAT | O_RDWR);
         this.#stats = fs.statSync(filepath);
         this.#buf = Buffer.alloc(this.#stats.size + 512000);

         if (this.#stats.size > maxMemory) {
            flag.errFileSize_outaRange = true;
            throw new RangeError();
         } // * e

         fs.readSync(fd, this.#buf, 0, this.#stats.size);
         fs.chmodSync(filepath, filePermis);
         fs.closeSync(fd);

         /* 
.            

         |||>              END LOGIC               <|||
.                                                                                                 */
      } catch (e) {
         if (e instanceof TypeError && errFilepath_dataType == true) {
            throw new TypeError(
               e +
                  "Invalid data type passed into class TextDocument's constructor-parameter 'filepath'."
            );
         }

         if (e instanceof SyntaxError && errFilepath_fileType == true) {
            throw new SyntaxError(
               e +
                  "The string-argument passed into the class TextDocument constructor, is either improperly formatted, or a path to an invalid file-type. Only plain-text files, that have a dot-txt ('.txt') extention tacked onto the end of there name, are accepted by the TextDocument class. Passing any other file-type into the TextDocument-constructor will result in the reoccurance of this error/msg and the imediate termination of the current process on which your application is contingent."
            );
         }

         if (e instanceof RangeError && errFileSize_outaRange == true) {
            throw new RangeError(
               e +
                  '"The size of the file that you are attempting to load into a TextDocument object is greater than the amount of memory allocated to the TextDocument class-object\'s buffer. When creating a TextDocument object,  The maximum amount of memory that TextDocument objects are able to store  c when creating them, but allocating more memory via the maxMemory parameter in the TextDocument constructor. maxMemory has a range with a minimum of 256000-BYT, and a maximum of 4194304-BYT."'
            );
         }
      }
   }

   setLineLength(maxCharsPerLine = 80) {
      // ==> CONSTANTS
      const text = this.text;
      const lineLen = maxCharsPerLine;

      // >-> VARIABLES
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

   save() {
      //  |TODO ADD| ||> Save Function for the TextDocument Class. This is important dude.
      return 0;
   }

   get text() {
      return this.#text;
   }

   get filePath() {
      return this.#filepath;
   }

   set text(text) {
      this.#text = text;
   }

   set filePath(filepath) {
      this.#filepath = filepath;
   }
}

module.exports.TextDocument = TextDocument;
