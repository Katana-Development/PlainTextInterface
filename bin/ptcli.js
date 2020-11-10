#!/usr/bin/env node
/** @format */

const chalk = require('chalk');
const command = process.argv;
const { MSG_INITITAL } = require('../lib/constants.json').CLI;

console.info(MSG_INITITAL);
