import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isLogged: boolean;
  login: (login: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const validLogin = "admin";
const validPassword = "123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  const login = (login: string, password: string): boolean => {
    if (login === validLogin && password === validPassword) {
      setIsLogged(true);
      return true;
    }
    setIsLogged(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ isLogged, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
