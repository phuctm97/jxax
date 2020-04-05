import { uniqueId } from 'lodash';
import { getPropReferenceExpression } from 'jxax/core/devtool/util';

/**
 * Mock Apple JXA scripting model.
 */
export default class MockedScriptingModel {
  /**
   * Create a new mocked scripting model.
   * @param {Object} mocks Mocks
   */
  constructor(mocks = {}) {
    // Map(<fullExpression> => <valueOrFunction>) for mocking apply invocations (function calls).
    this.mocks = new Map(Object.entries(mocks));

    // Map(<refSymbol> => {name: <refVarName>, value: <refValue>}}).
    this.refs = new Map();

    // Map(<refVarName> => <refExpression>) for getting fully-qualified expression of a ref.
    this.refsToFnExprs = new Map();

    // Prefix for variable name of all created refs.
    this.refNamePrefix = 'var';

    // Tracked execution statements.
    this.stmts = [];
  }

  /**
   * Find ref by symbol.
   * @param {Symbol} sym Ref symbol
   */
  ref(sym) {
    return this.refs.get(sym);
  }

  /**
   * Allocate a new ref's variable name.
   */
  newRef() {
    return uniqueId(this.refNamePrefix);
  }

  /**
   * Put a ref to model's references memory.
   * @param {Symbol} sym Ref symbol
   * @param {String} name Ref variable name
   * @param {any} value Ref value
   * @param {String} fnExpr Ref's evaluable expression
   */
  addRef(sym, name, value, fnExpr) {
    this.refs.set(sym, { name, value });
    this.refsToFnExprs.set(name, fnExpr);
  }

  /**
   * Return a prop's referencing expression.
   * @param {any} prop Prop identiter
   */
  getPropExpr(prop) {
    const ref = this.ref(prop);
    if (ref) return `[${ref.name}]`;

    return getPropReferenceExpression(prop);
  }

  /**
   * Return a value expression.
   * @param {any} val Value
   */
  getValueExpr(val) {
    const toPrimitive = val[Symbol.toPrimitive];
    if (typeof toPrimitive === 'function') {
      const prim = toPrimitive();
      if (typeof prim === 'symbol') {
        const ref = this.ref(prim);
        if (ref) return ref.name;
      }
    }
    // TODO: replace with get object expression, to replace obj referencing to value.
    return JSON.stringify(val);
  }

  /**
   * Return fully-qualified expression of a function expression.
   * @param {String} fnExpr Function expression
   */
  getFullExpr(fnExpr) {
    // Replace all detected refs' variable names by their expressions until no ref found.

    const regex = new RegExp(`[^0-9a-zA-Z_\\.]?(${this.refNamePrefix}[0-9]+)[^0-9a-zA-Z_\\.]?`, 'g');

    const expr = fnExpr.replace(regex, (match, p) => match.replace(p, this.refsToFnExprs.get(p)));

    if (expr === fnExpr) return expr;

    return this.getFullExpr(expr);
  }

  /**
   * Return a comment describing full-qualified version of provided statement.
   * @param {String} stmt Original statement
   */
  getStatementComment(stmt) {
    const fullStmt = this.getFullExpr(stmt);
    return fullStmt !== stmt ? `// ${fullStmt}\n` : '';
  }

  /**
   * Create a dynamic object whose properties are dynamic objects (callable).
   * If opts.callable is true, created dynamic object is callable and returns a dynamic object.
   * opts.symbol is used as internal reference identifer.
   * @param {String} objExpr Objection expression
   * @param {{callable: Boolean, symbol: Symbol}} opts Options
   */
  createDynamic(objExpr, { callable, symbol } = {}) {
    const target = callable ? () => {} : {};

    const handler = {
      get: (obj, prop) => {
        if (prop === Symbol.toPrimitive) {
          // Trap conversion to string or number.
          // E.g. being referenced as prop or be called in parseInt.
          return (hint) => {
            switch (hint) {
              case 'number':
                return 0;
              default:
                return symbol;
            }
          };
        }
        if (prop === 'toJSON') {
          // Trap JSON.stringify().
          return undefined;
        }

        // All props are callable by default.
        return this.trapGet(objExpr, prop, { callable: true });
      },
      apply: (obj, thisArg, args) => this.trapApply(objExpr, thisArg, args),
      set: (obj, prop, value) => this.trapSet(objExpr, prop, value),
    };

    return new Proxy(target, handler);
  }

  /**
   * Trap proxy get, return a dynamic objects (callable) with appropriate expression.
   * @param {String} objExpr Object expression
   * @param {any} prop Prop identifer
   * @param {{callable: Boolean}} param2 Options
   */
  trapGet(objExpr, prop, { callable } = {}) {
    const propExpr = this.getPropExpr(prop);
    return this.createDynamic(`${objExpr}${propExpr}`, { callable });
  }

  /**
   * Trap proxy apply, track invocation statements and return a dynamic objects (non-callable)
   * with appropriate expression.
   * @param {String} fnExpr Function expression
   * @param {any} thisArg This argument
   * @param {Array<any>} args Arguments
   */
  trapApply(fnExpr, thisArg, args) {
    // Derive apply statement.
    const argExprs = args.map((arg) => this.getValueExpr(arg));
    const applyStmt = `${fnExpr}(${argExprs.join(', ')})`;

    // Try get mocked value.
    const mockExpr = this.getFullExpr(fnExpr);
    let mock = this.mocks.get(mockExpr);
    if (typeof mock === 'function') {
      // Call mock if it's a function.
      mock = mock(...args);
    }

    // Create new ref.
    const resExpr = this.newRef();
    const resSym = Symbol(applyStmt);

    // Result is either mock or a new dynamic object.
    const res = mock || this.createDynamic(resExpr, { symbol: resSym });

    // Put ref and track statement.
    this.addRef(resSym, resExpr, res, applyStmt);
    this.stmts.push(`var ${resExpr} = ${applyStmt}; ${this.getStatementComment(applyStmt)}`);

    return res;
  }

  /**
   * Trap proxy set, track set statements.
   * @param {String} objExpr Object expression
   * @param {any} prop Prop identifer
   * @param {any} val Value
   */
  trapSet(objExpr, prop, val) {
    const propExpr = this.getPropExpr(prop);
    const valExpr = this.getValueExpr(val);

    const stmt = `${objExpr}${propExpr} = ${valExpr};`;
    this.stmts.push(`${stmt} ${this.getStatementComment(stmt)}`);
    return true;
  }

  /**
   * Export execution statements.
   */
  toString() {
    return this.stmts.join('\n\n');
  }
}
