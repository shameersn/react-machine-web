import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let localUserData = localStorage.getItem('user')
  const [user, setUser] = useState(JSON.parse(localUserData) || null);

  const login = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  };

  const logout = () => {
    setUser(null)
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);
