import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("lean-react-vite.helloWorld", () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        "react",
        "React Sample",
        vscode.ViewColumn.One,
        {
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "out"),
          ],
          enableScripts: true, 
        }
      );

      // And set its HTML content
      panel.webview.html = getWebviewContent(
        panel.webview,
        context.extensionUri
      );
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Webview側で使用できるようにuriに変換する関数。
function getUri(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathList: string[]
) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
  const webviewUri = getUri(webview, extensionUri, ["out", "webview/main.js"]);
  const nonce = getNonce();

  return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
	<div id="app"></div>
	<script type="module" nonce="${nonce}" src="${webviewUri}"></script> 
	</html>`;
}

