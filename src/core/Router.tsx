import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AuthScreen } from '../features/auth/AuthScreen.tsx';
import { RegisterScreen } from '../features/auth/RegisterScreen.tsx';
import { HomeScreen } from '../features/home/HomeScreen.tsx';
import { InitScreen } from '../features/init/InitScreen.tsx';
import { Layout } from './Layout.tsx';
import { AuthGuard } from './guard/AuthGuard.tsx';
import { InitGuard } from './guard/InitGuard.tsx';

export const PATH = {
  root: '/',
  init: '/init',
  login: '/login',
  register: '/register'
};

export function Router() {
  return useRoutes([
    {
      path: PATH.root,
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <InitGuard>
              <AuthGuard>
                <HomeScreen />
              </AuthGuard>
            </InitGuard>
          )
        },
        {
          path: PATH.login,
          element: (
            <InitGuard>
              <AuthScreen />
            </InitGuard>
          )
        },
        {
          path: PATH.register,
          element: <RegisterScreen />
        },
        {
          path: PATH.init,
          element: <InitScreen />
        }
      ]
    },
    { path: '*', element: <Navigate to={PATH.root} replace /> }
  ]);
}
