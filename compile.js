#!/usr/bin/env node

// Allow console logging
/* eslint no-console:0 */

// Libraries
const fs = require('fs');
const glob = require('glob');
const { inlineSource } = require('inline-source');
const path = require('path');

const root = process.cwd();
console.log(`Working directory: ${root}`);

async function minifyHtml(file, directory) {
  // Minifiy/inline the HTML, CSS and Javascript
  inlineSource(file, {
    attribute: false,
    compress: true,
  }).then((html) => {
    // Save the minified file
    const targetFile = path.parse(file).base.replace('.html', '.min.html');
    const targetPath = path.resolve(directory, targetFile);
    console.log(`Minified: ${targetFile}`);
    fs.writeFile(targetPath, html, (err) => {
      // Check for errors
      if (err) {
        console.log(err);
      }
    });
  }).catch((err) => {
    // Handle error
    console.log(err);
  });
}

// Find the directories
glob.sync('webviews/!(assets)', { cwd: root }).map((directory) => {
  // Find source HTML files
  glob.sync('src/*.html', { cwd: directory }).map((file) => {
    const sourceFile = path.resolve(path.join(directory, file));
    minifyHtml(sourceFile, directory);
    return true;
  });
  return true;
});
