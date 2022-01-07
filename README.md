## ReactNative WebView Helper
A small tool to assist with the use of raw HTML, CSS and JavaScript in ReactNative WebViews.

### Background
When using ReactNative WebView on mobile devices it is significiantly easier if the HTML, CSS and JavaScript is minified into a single HTML file.  However, this makes maintenance of the tool somewhat difficult.

This very simple tool aims to streamline the process by automatically minifying HTML files, including CSS and JavaScript files referenced by the file.

### Usage
- Create a 'webviews' directory within the root directory of the ReactNative project
- Add subdirectories for any WebView components (e.g. SignaturePad, Survey, ZXing...)
- Place all source files for the component within a 'src' subdirectory of the relevant component
- Run `node .\node_modules\react-native-webview-helper\compile.js` in the root directory of the ReactNative project

### Hints
If you are frequently updating the WebView components, you may prefer to add the script to the `package.json` file for easy usage, for example:
```
  "scripts": {
    "start": "expo start",
    ...
	"compile-webviews": "node .\\node_modules\\react-native-webview-helper\\compile.js"
  },
```
The script can then be run via the package manager, e.g. `yarn compile-webviews`.