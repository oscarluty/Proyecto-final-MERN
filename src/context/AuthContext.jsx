import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user) => {
      try {
        const res = await registerRequest(user);
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(true);
          setErrors([]);
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        if (error.response && error.response.data) {
          if (typeof error.response.data === 'string') {
            setErrors([error.response.data]);
          } else if (Array.isArray(error.response.data)) {
            setErrors(error.response.data);
          } else if (typeof error.response.data === 'object' && error.response.data.message) {
            setErrors([error.response.data.message]);
          } else {
            setErrors(['Ocurrió un error durante el registro']);
          }
        } else {
          setErrors(['Ocurrió un error durante el registro']);
        }
      }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setErrors(Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message]);
            } else {
                setErrors(["Ha ocurrido un error. Por favor, intenta de nuevo."]);
            }
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
        setErrors([]);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                isAuthenticated,
                isAdmin,
                errors,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};