# MySecret Extension

MySecret Extension is a Google Chrome extension that allows users to authorize and store a secret securely in the
extension's storage. It provides a simple UI for users to generate, store, and retrieve a secret, as well as to log in
and log out of the application.

## Demo
https://youtu.be/4ogZDlnhXDU

## Installation

1. Clone this repository.
2. Run the `npm run build` command to create the `/dist` folder.
3. Open Google Chrome and go to `chrome://extensions` in the address bar.
4. Enable Developer mode in the top-right corner of the Extensions page.
5. Click on the `Load unpacked` button in the top-left corner of the Extensions page.
6. Select the `/dist` folder.
7. The extension will be loaded, and a pop-up window will appear upon installation.

## Usage

### First-time Initialization

1. Upon installation, the extension window will pop up and present the user a new secret. The secret is a random
   string that is not yet saved in storage.
2. The user will then be asked to register by submitting a password and confirmation password.
3. If the password matches the confirmation, the generated secret will be encrypted and securely stored using the
   extension's storage.
4. At this point, the user will be automatically logged in and redirected to the home screen.

### Home Screen

1. On this screen, the user can see the secret.
2. The user can also regenerate the secret by clicking the `Regenerate Secret` icon, which will replace the original
   secret.
3. There is also a `Copy` icon to easily copy the secret to the clipboard.

### Log In

1. To log in, the user needs to enter the password they provided during the first-time initialization.
2. If the password is correct, the user will be able to see the stored secret.
3. The user can log out of the application by clicking the `Log Out` icon on the top right.

### Reset Extension State

1. If the user wants to reset the extension state to a new-like application, they can click the `Reset` button also on
   the top right.
2. This will prompt the user to go through the initialization process again, generating a new secret and setting a new
   password.
