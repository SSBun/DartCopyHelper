//@ts-check
import { BufferedTokenStream, CharStreams, ParserRuleContext } from "antlr4ts";
import { Dart2Lexer } from "./dart/Dart2Lexer";
import {
  ClassDefinitionContext,
  ClassMemberDefinitionContext,
  CompilationUnitContext,
  Dart2Parser,
  DeclarationContext,
  IdentifierContext,
} from "./dart/Dart2Parser";
import * as vscode from "vscode";

export namespace DartAnalyser {
  export function generateCloneFunction() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    let document = editor.document.getText();
    let charStream = CharStreams.fromString(document);
    let lexer = new Dart2Lexer(charStream);
    let tokenStream = new BufferedTokenStream(lexer);
    let parser = new Dart2Parser(tokenStream);
    parser.buildParseTree = true;
    let tree: CompilationUnitContext = parser.compilationUnit();

    let cursorLine = editor.selection.start.line;
    let searchedClasses = findContext(
      ClassDefinitionContext,
      tree,
      1,
      cursorLine
    );
    if (searchedClasses.length > 0) {
      // Search the class at the line the cursor stays at
      const currentClass = searchedClasses[0];
      /// Get class identifier
      const classIdentifier = findContext(
        IdentifierContext,
        currentClass,
        1,
        null,
        null
      )[0];
      const className = classIdentifier.text;
      console.log(`Find class: ${className}`);
      // Search all properties of the class
      let properties = findContext(
        ClassMemberDefinitionContext,
        currentClass,
        null,
        null,
        (item) => {
          return item.childCount > 0 && item.getChild(0) instanceof DeclarationContext;
        }
      );
      let offsetWidth = 0;
      if (properties.length > 0) {
        offsetWidth = properties[0].start.charPositionInLine;
        console.log(`find ${properties.length} properties`);
        let propertyNameList: string[] = [];
        for (var item of properties) {
          const propertyIdentifier = findContext(
            IdentifierContext,
            item,
            1,
            null,
            null
          )[0];
          const propertyName = propertyIdentifier.text;
          propertyNameList.push(propertyName);
          console.log(`property: ${propertyName}`);
        }
        const cloneFunctionCode = generateCloneCode(
          className,
          propertyNameList,
          offsetWidth
        );
        console.log(cloneFunctionCode);
        let endLine = currentClass.stop!.line;
        let position: vscode.Position = new vscode.Position(endLine - 1, 0);
        editor.insertSnippet(new vscode.SnippetString(cloneFunctionCode), position);
      }
    } else {
      console.log("not found this class");
    }
  }

  function findContext(
    metaClass: any,
    root: ParserRuleContext,
    count: number | null = null,
    line: number | null = null,
    filter: ((tree: ParserRuleContext) => boolean) | null = null
  ): ParserRuleContext[] {
    let ret: ParserRuleContext[] = [];
    if (!root) {
      return ret;
    }
    if (line !== null) {
      count = 1;
    }
    const q: ParserRuleContext[] = [root];
    while (q.length !== 0) {
      const currentLevelSize = q.length;
      for (let i = 1; i <= currentLevelSize; ++i) {
        const node = q.shift()!;
        if (node instanceof metaClass) {
        if (filter !== null) {
            if (!filter(node)) {
              continue;
            }
          }
          if (line !== null) { 
            if (node.start.line - 1 === line) {
              return [node];
            } else {
              continue;
            }
          }
          ret.push(node);
          if (count !== null && ret.length >= count) {
            return ret;
          }
          continue;
        }
        if (line !== null && node.start.line - 1 > line) {
          continue;
        }
        let childCount = node.childCount;
        for (var x = 0; x < childCount; x++) {
          let child = node.getChild(x);
          if (child instanceof ParserRuleContext) {
            q.push(child);
          }
        }
      }
    }
    return ret;
  }

  //   @override
  //   CourseState clone() {
  //     return CourseState()
  //       ..showThumb = showThumb
  //       ..chapterState = chapterState
  //       ..thumbState = thumbState
  //       ..loading = loading
  //       ..notifier = notifier
  //       ..avatarUrl = avatarUrl
  //       ..rank = rank;
  //   }
  function generateCloneCode(
    className: string,
    properties: string[],
    offsetWidth: number
  ): string {
    const tab = (count: number) => {
      return " ".repeat(offsetWidth + count * 2);
    };
    let code = tab(0) + "@override\n";
    code += tab(0) + `${className} clone() {\n`;
    code += tab(1) + `return ${className}()\n`;
    for (let i in properties) {
      code += tab(2) + `..${properties[i]} = ${properties[i]}`;
      if (i === `${properties.length - 1}`) {
        code += ';\n';        
      } else {
        code += '\n';
      }
    }
    code += tab(0) + "}\n";
    return code;
  }
}
