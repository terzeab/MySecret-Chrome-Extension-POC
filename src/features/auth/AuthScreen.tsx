import { HowToReg } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../../core/MyContext.tsx';
import { PasswordField } from '../../core/components/PasswordField.tsx';
import { PATH } from './../../core/Router.tsx';

export function AuthScreen() {
  const { loggedIn, handleLogin } = useMyContext();

  const [password, setPassword] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const disabled = !password;

  if (loggedIn) return <Navigate to={PATH.root} replace />;

  const doLogin = () => {
    if (disabled) return;
    if (password) {
      handleLogin(
        password,
        (response: { success: boolean; message: string }) => {
          if (response?.success === false) {
            setPasswordError(response.message);
            return;
          }

          setPasswordError(undefined);
        }
      );
    }
  };

  return (
    <>
      <h1>Login!</h1>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <PasswordField
            label={'Password'}
            value={password}
            onChange={(value) => {
              setPassword(value);
              setPasswordError(undefined);
            }}
            errorMessage={passwordError}
          />
        </Grid>

        <Grid item pt={2} xs={12} textAlign={'center'}>
          <Button
            variant={'contained'}
            disabled={disabled}
            onClick={doLogin}
            startIcon={<HowToReg />}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
