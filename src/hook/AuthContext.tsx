import { createContext, useContext, useEffect, useState } from "react";
import type {
  AuthErrors,
  Documents,
  SignInPayload,
  UserProfile,
} from "../types/auth";
import { ValidateSignIn } from "../utils/validate";
import { signInApi } from "../services/Api_Auth";
import { fetchProfileApi } from "../services/Api_User";
import { detailDocumentApi, fetchDocumentApi } from "../services/Api_Document";

type AuthContextType = {
  signIn: (data: SignInPayload) => void;
  fetchProfile: () => Promise<void>;
  fetchDocument: () => Promise<void>;
  errors: AuthErrors;
  user: UserProfile | null;
  documents: Documents[] | null;
  detailDocuments: Documents | null;
  isAuthenticated: boolean;
  detailDocument: (id: string) => void;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContextType = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [errors, setErrors] = useState<AuthErrors>({});
  const [user, setUser] = useState<UserProfile | null>(null);
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [detailDocuments, setDetailDocuments] = useState<Documents | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsAuthenticated(false);
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
      setErrors({
        api: "Mật khẩu hoặc tài khoản không đúng vui lòng nhập lại",
      });
      return false;
    }

    return false;
  };

  // GET PROFILE
  const fetchProfile = async () => {
    const res = await fetchProfileApi();
    console.log(res.data);
    setUser(res.data);
  };

  //GET DOCUMENT
  const fetchDocument = async (): Promise<void> => {
    const data = await fetchDocumentApi();
    console.log(data);
    setDocuments(data);
  };

  const detailDocument = async (id: string): Promise<void> => {
    const data = await detailDocumentApi(id);
    console.log(data);
    setDetailDocuments(data);
  };

  const value: AuthContextType = {
    detailDocuments,
    isAuthenticated,
    documents,
    fetchDocument,
    signIn,
    errors,
    fetchProfile,
    user,
    detailDocument,
  };
  return (
    <AuthContextType.Provider value={value}>
      {children}
    </AuthContextType.Provider>
  );
};

export const UseAuth = () => {
  const ctx = useContext(AuthContextType);
  if (!ctx) throw new Error("useAuth phải nằm trong AuthProvider");
  return ctx;
};
