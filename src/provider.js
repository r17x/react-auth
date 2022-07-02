import { createElement, useEffect, useReducer } from "react";
import { Provider } from "./context";
import { isTokenExpired } from "./jwt";
import { storage } from "./browser";
import { ifElse, noOp } from "./fp";
/**
 * @typedef {object} Auth
 * @property {boolean} isAuthenticated
 * @property {?string} accessToken
 * @property {?string} refreshToken
 */

/**
 * @callback SignInType
 * @param {string} token
 * @returns {void}
 */

/**
 * @callback SignOutType
 * @param {void}
 * @returns {void}
 */

/**
 * @ignore
 * @typedef {object} ExternalState
 * @property {boolean} isAuthenticated
 * @property {string | undefined} accessToken
 * @property {string | undefined} refreshToken
 * @property {SignInType} signIn
 * @property {SignOutType} signOut
 */

/**
 * @typedef {object} AuthProviderProps
 * @property {React.ReactNode} children
 * @property {?string} storageType - It will run effect for persistent state and store state in localStorage or sessionStorage
 * @property {?string} storageKey
 */

/**
 * @ignore
 * @type {Auth}
 */
const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};
/**
 * Provider Component for Auth
 *
 * @param {AuthProviderProps} props
 * @return {React.ReactNode}
 * @component
 * @example
 * import { AuthProvider } from '@kdnj/use-jwt'
 *
 * const App = () => {
 *  <AuthProvider>
 *    // your secure application here
 *  </AuthProvider>
 * }
 */
export const AuthProvider = ({ children, storageType, storageKey }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = storage(storageType).get(storageKey);
    ifElse(data, () => dispatch({ type: "signIn", data }), noOp);
  }, [storageType, storageKey]);

  useEffect(() => {
    if (state.isAuthenticated) {
      storage(storageType).set(storageKey, {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      });
    }
  }, [
    state.accessToken,
    state.refreshToken,
    state.isAuthenticated,
    storageType,
    storageKey,
  ]);

  function reducer(prevState, action) {
    switch (action.type) {
      case "signIn": {
        const { accessToken, refreshToken } = action.data;
        return {
          ...prevState,
          accessToken,
          refreshToken,
          isAuthenticated: !isTokenExpired(accessToken),
        };
      }
      case "signOut":
        return initialState;
      default:
        return prevState;
    }
  }
  /** @type {ExternalState} */
  const value = {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    isAuthenticated: state.isAuthenticated,
    signIn: (accessToken, refreshToken) => {
      dispatch({
        type: "signIn",
        data: {
          accessToken,
          refreshToken: refreshToken || null,
        },
      });
    },
    signOut: () =>
      dispatch({
        type: "signOut",
      }),
  };

  return createElement(Provider, { value }, children);
};
