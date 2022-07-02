export type AuthProviderProps = {
	isAuthenticated: boolean;
	accessToken: string | undefined;
	refreshToken: string | undefined;
	signIn: SignInType;
	signOut: SignOutType;
	children: React.ReactNode;
	storageType: "local" | "session" | undefined;
	storageKey: string | undefined;
}

export type AuthStore = {
	accessToken: string;
	refreshToken: string | undefined;
	get: getType;
	set: setType;
}


  /**
 * @method AuthProvider
 * @param {AuthProviderProps} props
 * @returns {React.ReactNode}
 */
  export function AuthProvider(props: AuthProviderProps): React.ReactNode

  /**
 * @method atob
 * @memberof browser
 * @param {string} str
 * @return {string}
 */
  export function atob(str: string): string

  /**
 * @method btoa
 * @memberof browser
 * @param {string} string
 * @returns {string}
 */
  export function btoa(string: string): string

  /**
 * decrypt string of token to be decode of JWT payload
 * @method decode
 * @memberof jwt
 * @param {string} token
 * @return {Object}
 */
  export function decode(token: string): Object

  /**
 * decrypt string of token to be string of JWT payload
 * @memberof jwt
 * @method decrypt
 * @param {string} token
 * @return {string}
 */
  export function decrypt(token: string): string

  /**
 * to validate JWT token is expired or not
 * @method isTokenExpired
 * @memberof jwt
 * @param {string} token
 * @return {Boolean}
 */
  export function isTokenExpired(token: string): Boolean
