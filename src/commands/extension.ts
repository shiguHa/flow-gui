import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("flow-gui.showWebView", () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        "react",
        "React Sample",
        vscode.ViewColumn.Two,
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

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case "getEditorContent":
              const editor = vscode.window.activeTextEditor;
              if (editor) {
                const text = editor.document.getText();
                panel.webview.postMessage({ command: "editorContent", text });
              }
              return;
            case "updateEditorContent":
              console.info('updateEditorContent');
              const { newText } = message;
              const edit = new vscode.WorkspaceEdit();
              // const document = vscode.window.activeTextEditor?.document;
              const document = getFirstTextEditor()?.document;
              if (document) {
                const fullRange = new vscode.Range(
                  document.positionAt(0),
                  document.positionAt(document.getText().length)
                );
                edit.replace(document.uri, fullRange, newText);
                vscode.workspace.applyEdit(edit);
              }
              return;
          }
        },
        undefined,
        context.subscriptions
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
  const webviewCssUri = getUri(webview, extensionUri, ["out", "webview/main.css"]);
  const nonce = getNonce();

  return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="${webviewCssUri}">
	</head>
	<body>
	<div id="app"></div>
	<script type="module" nonce="${nonce}" src="${webviewUri}"></script> 
	</html>`;
}

function getFirstTextEditor(): vscode.TextEditor | undefined {
  const editors = vscode.window.visibleTextEditors;
  return editors.find(editor => editor.document.languageId === 'plaintext');
}