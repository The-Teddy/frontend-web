import React, { createContext, useEffect, useState } from "react";
import { UserModel } from "./user.interface";
import { handleValidateEmail, handleValidateEmailCode } from "../helpers/utils";
import { toast } from "react-toastify";
import { login } from "../helpers/api";

interface AuthContextType {
  user: UserModel | null;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  emailNotVerified: boolean;
  handleLogin: (email: string, senha: string, code?: string | null) => void;
  handleLogout: () => void;
  setEmailNotVerified: (value: boolean) => void;
}

const defaultContextValue: AuthContextType = {
  user: null,
  token: "",
  isAuthenticated: false,
  loading: false,
  emailNotVerified: false,
  handleLogin: () => {},
  handleLogout: () => {},
  setEmailNotVerified: () => {},
};
interface AuthProviderProps {
  children: React.ReactNode;
}
const Context = createContext<AuthContextType>(defaultContextValue);

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);

  async function handleLogin(
    email: string,
    password: string,
    code: string | null = null
  ) {
    const data = {
      email: email.toLowerCase(),
      password,
      codeEmail: code ?? null,
    };
    if (!handleValidateEmail(email)) {
      return toast.warning("Insira um email válido.");
    }
    if (password.length < 8) {
      return toast.warning("Insira uma senha válida");
    }
    const validateEmail = handleValidateEmailCode(code);
    if (!validateEmail.isValid && emailNotVerified) {
      return toast.warning(validateEmail.message);
    }
    setLoading(true);
    login(data)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.data.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.data.data));
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.error?.credentialsIsInvalid) {
          return toast.error("Credenciais inválidas");
        } else if (error?.response?.data?.error?.codeOrEmailInvalid) {
          setEmailNotVerified(true);
          return toast.error(error.response?.data?.error?.message);
        } else if (error.response?.data?.error?.emailNotVerified) {
          setEmailNotVerified(true);
          return toast.error(error.response?.data?.error?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogout() {
    // AsyncStorage.removeItem("token");
    // AsyncStorage.removeItem("userData");
    // setToken("");
    // setUser(null);
  }

  useEffect(() => {
    async function loadInitialData() {
      try {
        const storedToken = localStorage.getItem("token") || "";
        const userData = localStorage.getItem("userData");
        setToken(storedToken);
        setUser(userData ? JSON.parse(userData) : null);
      } catch (error) {
        console.log("Failed to load initial data", error);
      }
    }
    loadInitialData();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          user,
          token,
          isAuthenticated,
          loading,
          emailNotVerified,
          handleLogin,
          handleLogout,
          setEmailNotVerified,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};

export { AuthContext, Context };
