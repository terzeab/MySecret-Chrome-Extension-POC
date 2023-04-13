import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChromeService } from './ChromeService.ts';

type IHandleSecret = () => void;

type IMyContext = {
  secret?: string;
  loggedIn?: boolean;
  initialized?: boolean;
  loaded: boolean;

  handleLogin: (password: string, callback: (response: object) => void) => void;
  handleRegister: (password: string) => void;
  handleLogout: () => void;
  handleRegenerateToken: () => void;
  handleResetStorage: () => void;

  fetchIsLoggedIn: () => void;
  fetchIsInitialized: () => void;

  handleSecret?: IHandleSecret;
};

const MyContext = createContext<IMyContext>();

export function useMyContext(): IMyContext {
  return useContext(MyContext);
}

export const MyContextProvider = ({ children }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [secret, setSecret] = useState<IMyContext['secret']>();
  const [loggedIn, setLoggedIn] = useState<IMyContext['loggedIn']>();
  const [initialized, setInitialized] = useState<IMyContext['initialized']>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    fetchAll();
  };

  const fetchAll = () => {
    ChromeService.fetchAll((response) => {
      setSecret(response.secret);
      setLoggedIn(response.loggedIn);
      setInitialized(response.initialized);
      setLoaded(true);
    });
  };

  const fetchIsLoggedIn = () => {
    ChromeService.fetchIsLoggedIn((response) => {
      setLoggedIn(response.loggedIn);
    });
  };

  const fetchIsInitialized = () => {
    ChromeService.fetchIsInitialized((response) => {
      setInitialized(response.initialized);
    });
  };

  const handleLogin: IMyContext['handleLogin'] = (password, callback) => {
    ChromeService.handleLogin(password, (response) => {
      if (response.success === true) fetch();
      callback(response);
    });
  };

  const handleRegister: IMyContext['handleRegister'] = (password: string) => {
    ChromeService.handleRegister(password, secret ?? '', fetch);
  };

  const handleLogout: IMyContext['handleLogout'] = () => {
    ChromeService.handleLogout(fetch);
  };

  const handleResetStorage: IMyContext['handleLogout'] = () => {
    ChromeService.handleResetStorage(fetch);
  };

  const handleRegenerateToken: IMyContext['handleRegenerateToken'] = () => {
    ChromeService.handleRegenerateToken(fetch);
  };

  return (
    <MyContext.Provider
      value={{
        initialized,
        loggedIn,
        secret,
        loaded,

        handleLogin,
        handleRegister,
        handleRegenerateToken,
        handleLogout,
        handleResetStorage,

        fetchIsLoggedIn,
        fetchIsInitialized
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
