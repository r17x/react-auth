/**
 * @ignore
 * @name noOp
 * @param {void}
 * @returns {void}
 */
export const noOp = () => {};

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
export const fx = (f, x) => f(x);
/**
  * @type <A=unknown,B,>(x: A, f: A => B, ) => B
  */
export const fxFlip = (x, f) => fx(f, x/**@type number*/);

export const reduce = (f, b, a) => a.reduce(f, b);

export const compose =
  (...args) =>
  (x) =>
    reduce(fxFlip, x, args);
