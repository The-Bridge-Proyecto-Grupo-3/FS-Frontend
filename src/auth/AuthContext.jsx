import { createContext, useMemo, useState } from 'react';

// Exportamos el contexto para que useAuth pueda consumirlo
export const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem('accessToken')
  );

  const loginWithToken = (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  const value = useMemo(
    () => ({ accessToken, loginWithToken, logout }),
    [accessToken]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
