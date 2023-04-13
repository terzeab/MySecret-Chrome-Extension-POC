import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MyContextProvider } from './MyContext.tsx';
import { Router } from './Router.tsx';
import { ThemeProvider } from './theme/index.tsx';

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
