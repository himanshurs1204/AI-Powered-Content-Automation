// src/hooks/useAuth.jsx
// Custom hook for authentication
import { useState, useContext, createContext, useEffect } from "react";
import { authAPI } from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await authAPI.getMe();
                    setUser(data.user);
                } catch (err) {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const register = async (name, email, password) => {
        try {
            setError(null);
            const { data } = await authAPI.register(name, email, password);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            throw err;
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const { data } = await authAPI.login(email, password);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, error, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
