import { CodeActionProvider, CodeActionKind, CodeAction } from "vscode";

export class CloneCodeActionProvider implements CodeActionProvider {
  public provideCodeActions(): CodeAction[] {
    return [
      {
        command: "dartcopyhelper.generateCloneFuncToClass",
        title: "Generate a clone function into class",
      },
      {
        command: "dartcopyhelper.generateCloneFuncToClipboard",
        title: "Generate a clone function to clipboard",
      },
      {
        command: "dartcopyhelper.generateCopyWithFuncToClass",
        title: "Generate a copy with function into class",
      },
      {
        command: "dartcopyhelper.generateCopyWithFuncToClipboard",
        title: "Generate a copy with function to clipboard",
      },
    ].map((item) => {
      let action = new CodeAction(item.title, CodeActionKind.Refactor);
      action.command = item;
      return action;
    });
  }
}
