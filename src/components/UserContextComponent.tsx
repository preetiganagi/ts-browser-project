import React, { createContext, useContext, useState, useEffect } from "react";
import User from "../types/User";
import http from "../http-common";
import { response } from "express";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    if (getToken()) {
        http.get(`/user`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }).then((response) => {
            setUser(response.data) 
            console.log(response.data)}
          )
          .catch((error) =>{removeToken() ;
          alert("please login again. Session time out")});
    }
    
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

const getToken = () => {
    return localStorage.getItem("token");
};
const removeToken = () => {
    localStorage.removeItem("token");
  };

