import React, { useState, createContext, ReactNode } from "react";

interface UserContextProps {
  isLoggedIn: boolean;
  setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsloggedIn: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const defaultValueHandler = () => {
    const user = localStorage.getItem("user");
    if (user) return true;
    return false;
  };

  const [isLoggedIn, setIsloggedIn] = useState<boolean>(defaultValueHandler());
  const user: UserContextProps = {
    isLoggedIn,
    setIsloggedIn,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
