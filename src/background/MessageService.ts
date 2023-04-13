import bcrypt from 'bcryptjs';
import { IMessage, IMessageResponse } from '../core/ChromeService.ts';
import { ChromeService } from './ChromeService.ts';
import { SecretService } from './SecretService.ts';
import { generateSecret } from './utils.ts';

const handleLogin = (request: IMessage, sendResponse) => {
  if (request.action !== 'handleLogin') return;

  ChromeService.getValueFromStorage('accountIdentification', (value) => {
    bcrypt.compare(request.password, value, function (err, result) {
      if (result) {
        ChromeService.setValueInStorage('loggedIn', true);
        sendResponse({ success: true });
        return;
      }

      sendResponse({ success: false, message: 'Incorrect password!' });
    });
  });
};

const handleRegister = (request: IMessage, sendResponse) => {
  if (request.action !== 'handleRegister') return;

  bcrypt.hash(request.password, 10, function (err, hash) {
    const { encryptionKeyHex, ivHex, encrypted } =
      SecretService.generateNewEncryptedSecret(request.secret);

    ChromeService.setValueInStorage('secret', encrypted);
    ChromeService.setValueInStorage('e', encryptionKeyHex);
    ChromeService.setValueInStorage('i', ivHex);

    ChromeService.setValueInStorage('accountIdentification', hash);
    ChromeService.setValueInStorage('loggedIn', true); // auto login on register
    sendResponse({});
  });
};

const handleLogout = (request: IMessage, sendResponse) => {
  if (request.action !== 'handleLogout') return;

  ChromeService.setValueInStorage('loggedIn', false);
  sendResponse({});
};

const handleRegenerateToken = (request: IMessage, sendResponse) => {
  if (request.action !== 'handleRegenerateToken') return;

  ChromeService.getValueFromStorage(['secret', 'loggedIn'], (value) => {
    if (value['loggedIn']) {
      const { encryptionKeyHex, ivHex, encrypted } =
        SecretService.generateNewEncryptedSecret();
      ChromeService.setValueInStorage('secret', encrypted);
      ChromeService.setValueInStorage('e', encryptionKeyHex);
      ChromeService.setValueInStorage('i', ivHex);
    }

    sendResponse({});
  });
};

const fetchIsLoggedIn = (request: IMessage, sendResponse) => {
  if (request.action !== 'fetchIsLoggedIn') return;

  ChromeService.getValueFromStorage('loggedIn', (value) => {
    sendResponse({ loggedIn: !!value });
  });
};

const fetchIsInitialized = (request: IMessage, sendResponse) => {
  if (request.action !== 'fetchIsInitialized') return;

  ChromeService.getValueFromStorage('accountIdentification', (value) => {
    sendResponse({ initialized: !!value });
  });
};

const fetchAll = (request: IMessage, sendResponse) => {
  if (request.action !== 'fetchAll') return;

  const response: IMessageResponse['fetchAll'] = {};
  ChromeService.getValueFromStorage(
    ['secret', 'accountIdentification', 'loggedIn', 'e', 'i'],
    (value) => {
      if (value['secret'] && value['e'] && value['i']) {
        response.secret = SecretService.decodeEncryptedSecret(
          value['e'],
          value['i'],
          value['secret']
        );
      } else {
        response.secret = generateSecret(32);
      }

      response.loggedIn = !!value['loggedIn'];
      response.initialized = !!value['accountIdentification'];
      sendResponse(response);
    }
  );
};

const handleResetStorage = (request: IMessage, sendResponse) => {
  if (request.action !== 'handleResetStorage') return;

  ChromeService.resetStorage(sendResponse);
};

export const MessageService = {
  handleLogin,
  handleRegister,
  handleLogout,
  handleRegenerateToken,
  fetchIsLoggedIn,
  fetchIsInitialized,
  fetchAll,
  handleResetStorage
};
