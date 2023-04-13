import { MessageService } from './background/MessageService.ts';
import { IMessage } from './core/ChromeService.ts';

chrome.runtime.onInstalled.addListener(function (details) {
  // Check if the extension was just installed
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 480,
      height: 310,
      left: 100,
      top: 100
    });
  }
});

chrome.runtime.onMessage.addListener(
  (request: IMessage, sender, sendResponse) => {
    console.log(
      `Message received in background.js [${request.action}]: `,
      request
    );

    MessageService.handleLogin(request, sendResponse);
    MessageService.handleRegister(request, sendResponse);
    MessageService.handleLogout(request, sendResponse);
    MessageService.handleRegenerateToken(request, sendResponse);
    MessageService.fetchIsLoggedIn(request, sendResponse);
    MessageService.fetchIsInitialized(request, sendResponse);
    MessageService.fetchAll(request, sendResponse);
    MessageService.handleResetStorage(request, sendResponse);

    return true;
  }
);
