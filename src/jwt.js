import { compose } from "./fp";
import { atob } from "./browser";

const replaceMinToPlus = (str) => str.replace("-", "+");

const replaceUnderscoreToSlash = (str) => str.replace("_", "/");

const toBase64 = compose(replaceMinToPlus, replaceUnderscoreToSlash);

const splitByDot = (str) => str.split(".");

const toPayload = compose(splitByDot, ([, payload]) => payload || "");

const isExpired = (exp) =>
  new Date(0).setUTCSeconds(exp).valueOf() < new Date().valueOf();
// const toHeader = compose(splitByDot, ([header]) => header || "");

/**
 * decrypt string of token to be string of JWT payload
 *
 * @param {string} token
 * @return {string}
 */
export const decrypt = compose(toPayload, toBase64, atob);
/**
 * decoded of token and it will be return JWT Payload.
 *
 * @param {string} token
 * @return {Object}
 */
export const decode = compose(decrypt, JSON.parse);
/**
 * to validate JWT token is expired or NOT.
 *
 * @param {string} token
 * @return {Boolean}
 * @example
 * import { isTokenExpired } from '..'
 *
 * const token = '//some token'
 *
 * isTokenExpired(token)
 */
export const isTokenExpired = compose(decode, ({ exp }) =>
  exp ? isExpired(exp) : true
);
