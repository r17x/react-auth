import { compose, ifElse, map } from "./fp";
import { atob, btoa } from "./browser";

/**
 * @typedef {object} JWS - JSON Web Signature
 * @property {string} header - encoded header
 * @property {string} payload - encoded payload
 */

/**
 * [JWS Overview](https://www.rfc-editor.org/rfc/rfc7515.html#section-3)
 */
const replaceMinToPlus = (str) => str.replace("-", "+");
const replacePlusToMin = (str) => str.replace("+", "-");

const replaceUnderscoreToSlash = (str) => str.replace("_", "/");
const replaceSlashToUnderscore = (str) => str.replace("/", "_");

const splitByDot = (str) => str.split("."); // [ s, s, s ]
const joinByDot = (a) => a.join(".");

const addPadding = (s) => s.concat("=".repeat((4 - (s.length % 4)) % 4));
const removePadding = (s) => s.replace(/=+$/, "");

const toBase64 = compose(replaceMinToPlus, replaceUnderscoreToSlash);
const toBase64URL = compose(replaceSlashToUnderscore, replacePlusToMin);

/**
 * decrypt string of token to be string of JWT payload
 *
 * @param {string} token - plain text JWT Token
 * @return {string}
 */
export const decrypt = compose(toBase64, atob);
export const encrypt = compose(btoa, toBase64URL);

const toStructJWS = ([header, payload /*signature*/]) => ({ header, payload });
const toTupleJWS = ({ header, payload /*signature*/ }) => [header, payload];

/**
 * Decoded Token to structured object with properties header, payload, and (REMOVED) signature.
 *
 * @param {string} token - plain text JWT Token
 * @return {JWS}
 * @example
 *
 * decoded("SOMETOKEN")
 *
 * // output
 * // { header: {...}, payload: {...} }
 *
 */
export const decoded = compose(
  splitByDot,
  ([a, b]) => [a, addPadding(b)],
  map(decrypt),
  map(JSON.parse),
  toStructJWS
);
/**
  * Encoded JWT Payload to decoded Token string
  * @param {JWS} decodedToken
  * @return {string} token
  */
export const encoded = compose(
  toTupleJWS,
  map(JSON.stringify),
  map(encrypt),
  joinByDot,
  removePadding
);

const isExpired = (exp) =>
  new Date(0).setUTCSeconds(exp).valueOf() < new Date().valueOf();

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
export const isTokenExpired = compose(decoded, ({ exp }) =>
  ifElse(
    exp,
    () => isExpired(exp),
    () => true
  )
);
/** TEST

const inputJWT =     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWdlIjoxMiwiam9icyI6WyJzZWN1cml0eSIsImVuZ2luZWVyIl0sImlhdCI6MTUxNjIzOTAyMn0";

const decodedToken = decoded(inputJWT)

const encodedToken = encoded(decodedToken)

console.log(
  {inputJWT, decodedToken, encodedToken, isValid: inputJWT === encodedToken}
)

*/
