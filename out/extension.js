"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const child_process_1 = require("child_process");
const vscode = require("vscode");
function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('ZCML Language');
    let disposables = [];
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (!e.affectsConfiguration('zcmlLanguage'))
            return;
        disposables.forEach((d) => d.dispose());
        disposables = registerFormatter(outputChannel);
    });
    disposables = registerFormatter(outputChannel);
}
exports.activate = activate;
const getZPrettyPath = () => {
    const config = vscode.workspace.getConfiguration('zcmlLanguage');
    return config.get('zprettypath', '');
};
const getZPrettyOptions = () => {
    const config = vscode.workspace.getConfiguration('zcmlLanguage');
    return config.get('zprettyoptions', '');
};
const registerFormatter = (outputChannel) => {
    return [{
            'disabled': false,
            'languages': ['zcml'],
            'command': getZPrettyPath(),
            'options': getZPrettyOptions(),
        }]
        .map((formatter) => {
        if (formatter.disabled)
            return;
        return vscode.languages.registerDocumentFormattingEditProvider(formatter.languages, {
            provideDocumentFormattingEdits(document, options) {
                var _a, _b;
                const command = formatter.command + " " + formatter.options;
                outputChannel.appendLine(command);
                const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
                const backupFolder = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0];
                const cwd = ((_b = workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.uri) === null || _b === void 0 ? void 0 : _b.fsPath) || (backupFolder === null || backupFolder === void 0 ? void 0 : backupFolder.uri.fsPath);
                return new Promise((resolve, reject) => {
                    var _a, _b;
                    outputChannel.appendLine(`Starting formatter: ${command}`);
                    const originalDocumentText = document.getText();
                    const process = (0, child_process_1.exec)(command, { cwd }, (error, stdout, stderr) => {
                        if (error) {
                            outputChannel.appendLine(`Formatter failed: ${command}\nStderr:\n${stderr}`);
                            reject(error);
                        }
                        if (originalDocumentText.length > 0 && stdout.length === 0) {
                            outputChannel.appendLine(`Formatter returned nothing - not applying changes.`);
                            resolve([]);
                        }
                        const documentRange = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).rangeIncludingLineBreak.end);
                        outputChannel.appendLine(`Finished running formatter: ${command}`);
                        if (stderr.length > 0)
                            outputChannel.appendLine(`Possible issues ocurred:\n${stderr}`);
                        resolve([new vscode.TextEdit(documentRange, stdout)]);
                    });
                    (_a = process.stdin) === null || _a === void 0 ? void 0 : _a.write(originalDocumentText);
                    (_b = process.stdin) === null || _b === void 0 ? void 0 : _b.end();
                });
            },
        });
    })
        .filter((v) => v != null);
};
// this method is called when your extension is deactivated
function deactivate() {
    const outputChannel = vscode.window.createOutputChannel('ZCML Language');
    outputChannel.appendLine('Extension disabled');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map