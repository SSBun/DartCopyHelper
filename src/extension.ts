// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CloneCodeActionProvider } from './clone-code-action-provider';
import { DartAnalyser } from './dart-analyser';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('dartcopyhelper.generateCloneFunc', DartAnalyser.generateCloneFunction),
		vscode.languages.registerCodeActionsProvider("dart", new CloneCodeActionProvider())
	)
}

// this method is called when your extension is deactivated
export function deactivate() { }
