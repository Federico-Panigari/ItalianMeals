import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MockUser, validateLogin } from "../services/auth";
import { saveUser, loadUser, removeUser } from "../services/storage";

interface AuthContextValue {
  user: MockUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    loadUser().then((u) => {
      if (u) setUser(u);
    });
  }, []);

  function login(email: string, password: string): boolean {
    const found = validateLogin(email, password);
    if (!found) return false;
    setUser(found);
    saveUser(found).catch(() => {});
    return true;
  }

  function logout() {
    setUser(null);
    removeUser().catch(() => {});
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro un AuthProvider");
  }
  return context;
}