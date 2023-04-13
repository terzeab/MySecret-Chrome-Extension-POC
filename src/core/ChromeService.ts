type ICallback = (response: object) => void;

export type IMessage =
  | { action: 'handleLogin'; password: string }
  | { action: 'handleRegister'; password: string; secret: string }
  | { action: 'handleLogout' }
  | { action: 'handleResetStorage' }
  | { action: 'handleRegenerateToken' }
  | { action: 'fetchIsLoggedIn' }
  | { action: 'fetchIsInitialized' }
  | { action: 'fetchAll' };

export type IMessageResponse = {
  fetchSecret: { secret: string };
  fetchIsLoggedIn: { loggedIn: boolean };
  fetchIsInitialized: { initialized: boolean };
  fetchAll: {
    secret: string;
    loggedIn: boolean;
    initialized: boolean;
  };
};

const sendMessage = (message: IMessage, callback: (...args: any[]) => void) =>
  chrome.runtime.sendMessage(message, callback);

// --- handlers ---
const handleLogin = (password: string, callback: ICallback) =>
  sendMessage({ action: 'handleLogin', password }, callback);

const handleRegister = (
  password: string,
  secret: string,
  callback: ICallback
) => sendMessage({ action: 'handleRegister', password, secret }, callback);

const handleLogout = (callback: ICallback) =>
  sendMessage({ action: 'handleLogout' }, callback);

const handleResetStorage = (callback: ICallback) =>
  sendMessage({ action: 'handleResetStorage' }, callback);

const handleRegenerateToken = (callback: ICallback) =>
  sendMessage({ action: 'handleRegenerateToken' }, callback);

// --- fetches ---
const fetchIsLoggedIn = (
  callback: (response: IMessageResponse['fetchIsLoggedIn']) => void
) => sendMessage({ action: 'fetchIsLoggedIn' }, callback);

const fetchIsInitialized = (
  callback: (response: IMessageResponse['fetchIsInitialized']) => void
) => sendMessage({ action: 'fetchIsInitialized' }, callback);

const fetchAll = (callback: (response: IMessageResponse['fetchAll']) => void) =>
  sendMessage({ action: 'fetchAll' }, callback);

export const ChromeService = {
  // --- handlers ---
  handleLogin,
  handleRegister,
  handleRegenerateToken,
  handleLogout,
  handleResetStorage,

  // --- fetches ---
  fetchIsLoggedIn,
  fetchIsInitialized,
  fetchAll
};
