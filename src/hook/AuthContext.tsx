import { createContext, useContext, useEffect, useState } from "react";
import type { AuthErrors, SignInPayload, UserProfile } from "../types/AuthType";
import { ValidateSignIn } from "../utils/validate";
import { signInApi } from "../services/Api_Auth";
import { fetchProfileApi } from "../services/Api_User";

type AuthContextType = {
  signIn: (data: SignInPayload) => Promise<boolean>;
  signOut: () => void;
  fetchProfile: () => Promise<void>;
  errors: AuthErrors;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [errors, setErrors] = useState<AuthErrors>({});
  const [user, setUser] = useState<UserProfile | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const signIn = async (data: SignInPayload): Promise<boolean> => {
    const e = ValidateSignIn(data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return false;
    }

    try {
      const res = await signInApi(data);
      if (res.status === 201) {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setErrors({});
        return true;
      }
    } catch {
      setErrors({ api: "Sai tài khoản hoặc mật khẩu" });
    }
    return false;
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const fetchProfile = async () => {
    const res = await fetchProfileApi();
    if (res.status === 200) setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        fetchProfile,
        errors,
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải nằm trong AuthProvider");
  return ctx;
};
