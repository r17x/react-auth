/**
  * @module fp
  */

/**
  * @function
 * @param {void}
 * @return {void}
 */
  export const noOp = () => {};
/**
  * @function
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
export const eq = (a, b) => a === b;
/**
  * @function
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
export const notEq = (a, b) => a !== b;
/**
  * @function
 * @param {T}
 * @return {number}
 */
export const length = (a) => a.length || 0;
export const ifElse =
  (condition, whenTrue, whenFalse) =>
  (...args) =>
    (condition ? whenTrue : whenFalse)(...args);
/**
  * a function for apply `f` as function with `x` as parameter.
  * @function
  *
  * @param {function(A):B} f
  * @param {A} x
  * @return {B}
  *
  * @example 
  *
  * const add2 = (a) => a + 2
  *
  * fx(add2, 2) // 4
  */
const log = (a) => {
  notEq(String(process.env.NODE_ENV).toLowerCase(), "production") &&
    console.log(a);
  return a;
};
export const fx = (f, x) => f(x);
export const flip = (f) => (a, b) => f(b, a);
export const fxFlip = flip(fx);
export const curry = (f, ...a) =>
  eq(length(f), length(a)) ? f(...a) : (...b) => curry(f, ...a, ...b);
export const reduce = curry((f, b, a) => a.reduce(f, b));
export const map = curry((f, a) => a.map((x) => f(x)));
export const mapWithIndex = curry((f, a) => a.map((b, c) => f(b, c)));
export const compose =
  (...args) =>
  (x) =>
    reduce(fxFlip, x, args)
