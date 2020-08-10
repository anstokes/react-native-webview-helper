#!/usr/bin/env node

// Libraries
var fs = require("fs");
var glob = require("glob");
var { inlineSource } = require("inline-source");
var path = require("path");

// Fetch arguments, if any
const [,, ...args] = process.argv;

var root = process.cwd();
//var root = "D:\\ReactNative\\mSite";
console.log('Working directory: ' + root);

// Find the directories
glob.sync("webviews/!(assets)", {cwd: root}).map(directory => {
	var directoryPath = path.resolve(path.join(root, directory));
	// Find source HTML files
	glob.sync("src/*.html", {cwd: directory}).map(file => {
		var sourceFile = path.resolve(path.join(directory, file));
		minifyHtml(sourceFile, directory);
	});
});
	
async function minifyHtml(file, directory) {
	// Minifiy/inline the HTML, CSS and Javascript
	inlineSource(file, {
		attribute: false,
		compress: true
	}).then((html) => {
		// Save the minified file
		var targetFile = path.parse(file).base.replace('.html', '.min.html');
		var targetPath = path.resolve(directory, targetFile);
		console.log('Minified: ' + targetFile);
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