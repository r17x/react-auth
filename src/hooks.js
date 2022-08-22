/**
 * @namespace Hooks
 */
import { useContextWithSelector } from "./context";
import { decoded as decode } from "./jwt";

const signInSelector = (v) => v.signIn;
const signOutSelector = (v) => v.signOut;
const authSelector = ({ isAuthenticated, accessToken, refreshToken }) => ({
  isAuthenticated,
  accessToken,
  refreshToken,
});
const accessTokenSelector = (v) => v.accessToken;
/**
 * @category API
 * @param {void}
 * @return {Auth}
 * @example
 * import { useAuth } from '@kdnj/use-jwt'
 *
 * const App = () => {
 *  const { isAuthenticated }  = useAuth()
 *
 *  if(isAuthenticated){
 *   // do whatever when user is authenticated
 *  }
 *
 *  return null
 * }
 */
export const useAuth = () => useContextWithSelector(authSelector);
/**
 * @example
 * const signIn = useSignIn()
 *
 * <button onClick={() => signIn("TOKEN")} />
 */
export const useSignIn = () => useContextWithSelector(signInSelector);
/**
 * @example
 * const signOut = useSignOut()
 *
 * <button onClick={() => signOut()} />
 */
export const useSignOut = () => useContextWithSelector(signOutSelector);

export const useDecoded = () => {
  const accessToken = useContextWithSelector(accessTokenSelector);
  if (accessToken) return decode(accessToken);
  return null;
};

export const usePayload = () => {
  const decoded = useDecoded();
  if (decoded) {
    const { iat: _, exp: __, sub: ___, ...payload } = decoded;
    return payload;
  }
  return decoded;
};
