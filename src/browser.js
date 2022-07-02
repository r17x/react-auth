/**
 * @ignore
 * @namespace browser
 */
import { ifElse, noOp } from "./fp";
/**
 * @name isBrowser
 * @memberof browser
 * @var {boolean}
 */
export const isBrowser = (() =>
  process.browser || typeof window !== "undefined")(); 
/**
 * @method atob
 * @memberof browser
 * @param {string} str
 * @return {string}
 */
export const atob = ifElse(
  isBrowser,
  (str) => window.atob(str),
  (str) => Buffer.from(str, 'base64').toString('binary')
);
/**
 * @method btoa
 * @memberof browser
 * @param {string} string
 * @returns {string}
 */
export const btoa = ifElse(
  isBrowser,
  (str) => window.btoa(str),
  (str) => Buffer.from(str, 'binary').toString("base64")
);

/**
 *
 * @typedef {object} storeType
 * @property {string} accessToken
 * @property {string | undefined} refreshToken
 *
 * @callback setType
 * @param {string} key
 * @param {storeType} val
 * @return {void}
 *
 * @callback getType
 * @param {string} key
 * @return {storeType}
 *
 * @typedef {object} AuthStore
 * @property {getType} get
 * @property {setType} set
 *
 *
 * @callback storage
 * @param {"local" | "session" | null | undefined } storeType
 * @return {AuthStore}
 */

/**
 * @type {storage}
 */
export const storage = ifElse(
  isBrowser,
  (t) => ({
    get: (key) => {
      const val =
        t === "local"
          ? localStorage.getItem(key)
          : t === "session"
          ? sessionStorage.getItem(key)
          : null;

      return val ? JSON.parse(val) : null;
    },

    set: (() => {
      switch (t) {
        case "session":
          return (key, val) => sessionStorage.setItem(key, JSON.stringify(val));
        case "local":
          return (key, val) => localStorage.setItem(key, JSON.stringify(val));
        default:
          return noOp;
      }
    })(),
  }),
  () => ({
    get: noOp,
    set: noOp,
  })
);
