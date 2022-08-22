/**
 * @ignore
 * @name noOp
 * @param {void}
 * @returns {void}
 */
export const noOp = () => {};
export const eq = (a, b) => a === b;
export const notEq = (a, b) => a !== b;
export const length = (a) => a.length;
/**
 * @type <A=unknown, B=unknown,>(condition: boolean, whenTrue: (...a: A) => B, whenFalse: (...b: A) => B) => (...args: A) => B
 */
export const ifElse =
  (condition, whenTrue, whenFalse) =>
  (...args) =>
    (condition ? whenTrue : whenFalse)(...args);
/**
 * @type <A,B,>(f: A => B, x: A) => B
 */
export const fx = (f, x) => log(f(x));

export const flip = (f) => (a, b) => f(b, a);

const log = (a) => {
  notEq(String(process.env.NODE_ENV).toLowerCase(), "production") &&
    console.log(a);
  return a;
};
/**
 * @type <A=unknown,B,>(x: A, f: A => B, ) => B
 */
export const fxFlip = flip(fx);

export const curry = (f, ...a) =>
  eq(length(f), length(a)) ? f(...a) : (...b) => curry(f, ...a, ...b);

export const reduce = curry((f, b, a) => a.reduce(f, b));

export const map = curry((f, a) => a.map((x) => f(x)));

export const mapWithIndex = curry((f, a) => a.map((b, c) => f(b, c)));

export const compose =
  (...args) =>
  (x) =>
    reduce(fxFlip, x, args);
