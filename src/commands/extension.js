"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
var vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("lean-react-vite.helloWorld", function () {
        // Create and show panel
        var panel = vscode.window.createWebviewPanel("react", "React Sample", vscode.ViewColumn.One, {
            localResourceRoots: [
                vscode.Uri.joinPath(context.extensionUri, "out"),
            ],
            enableScripts: true,
        });
        // And set its HTML content
        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
    }));
}
// This method is called when your extension is deactivated
function deactivate() { }
// Webview側で使用できるようにuriに変換する関数。
function getUri(webview, extensionUri, pathList) {
    var _a;
    return webview.asWebviewUri((_a = vscode.Uri).joinPath.apply(_a, __spreadArray([extensionUri], pathList, false)));
}
function getNonce() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function getWebviewContent(webview, extensionUri) {
    var webviewUri = getUri(webview, extensionUri, ["out", "webview/main.js"]);
    var nonce = getNonce();
    return "<!DOCTYPE html>\n\t<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"UTF-8\">\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t</head>\n\t<body>\n\t<div id=\"app\"></div>\n\t<script type=\"module\" nonce=\"".concat(nonce, "\" src=\"").concat(webviewUri, "\"></script> \n\t</html>");
}
