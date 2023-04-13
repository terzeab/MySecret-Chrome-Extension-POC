import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../MyContext.tsx';
import { PATH } from './../Router.tsx';

type AuthGuardProps = {
  children: React.ReactNode;
};

export function InitGuard({ children }: AuthGuardProps) {
  const { initialized } = useMyContext();

  if (!initialized) {
    return <Navigate to={PATH.init} replace />;
  }

  return <> {children} </>;
}
