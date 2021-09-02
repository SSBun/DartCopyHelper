import { CodeActionProvider, CodeActionKind, CodeAction } from "vscode";

export class CloneCodeActionProvider implements CodeActionProvider {
    public provideCodeActions(): CodeAction[] {
        let action = new CodeAction('Generate clone function', CodeActionKind.Refactor)
        action.command = {
            command: "dartcopyhelper.generateCloneFunc",
            title: "Generate a clone function"
        }
        return [action]
    }
}