// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { CloneCodeActionProvider } from "./clone-code-action-provider";
import { DartAnalyser } from "./dart-analyser";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("dartcopyhelper.generateCloneFuncToClass", () =>
      DartAnalyser.generateCloneFunction(
        DartAnalyser.GeneratingType.clone,
        DartAnalyser.DisplayType.writeInClass
      )
    ),
    vscode.commands.registerCommand("dartcopyhelper.generateCopyWithFuncToClass", () =>
      DartAnalyser.generateCloneFunction(
        DartAnalyser.GeneratingType.copyWith,
        DartAnalyser.DisplayType.writeInClass
      )
    ),
    vscode.commands.registerCommand("dartcopyhelper.generateCloneFuncToClipboard", () =>
      DartAnalyser.generateCloneFunction(
        DartAnalyser.GeneratingType.clone,
        DartAnalyser.DisplayType.writeToClipboard
      )
    ),
    vscode.commands.registerCommand("dartcopyhelper.generateCopyWithFuncToClipboard", () =>
      DartAnalyser.generateCloneFunction(
        DartAnalyser.GeneratingType.copyWith,
        DartAnalyser.DisplayType.writeToClipboard
      )
    ),
    vscode.languages.registerCodeActionsProvider(
      "dart",
      new CloneCodeActionProvider()
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
