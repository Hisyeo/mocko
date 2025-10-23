import { ErrorListener } from 'antlr4';

export class HisyeoErrorListener extends ErrorListener {
  constructor() {
    super();
    this.errors = [];
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.errors.push({ line, column, msg });
  }
}
