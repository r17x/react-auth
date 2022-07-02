import { createContext, useContext, useMemo } from "react";

const authContext = createContext();
export const Provider = authContext.Provider;
export const useContextWithSelector = (selector) => {
  const state = useContext(authContext);

  const selected = selector(state);

  return useMemo(() => selected, [selected]);
};
