import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../MyContext.tsx';
import { PATH } from './../Router.tsx';

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { loggedIn } = useMyContext();

  if (!loggedIn) {
    return <Navigate to={PATH.login} replace />;
  }

  return <> {children} </>;
}
