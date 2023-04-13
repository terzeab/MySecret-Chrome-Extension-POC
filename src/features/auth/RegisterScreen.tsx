import { HowToReg, PersonAdd } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMyContext } from '../../core/MyContext.tsx';
import { PasswordField } from '../../core/components/PasswordField.tsx';
import { PATH } from './../../core/Router.tsx';

export function RegisterScreen() {
  const { initialized, handleRegister } = useMyContext();

  const [password, setPassword] = useState<string | undefined>();
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>();

  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | undefined
  >();

  const disabled =
    !password ||
    !passwordConfirm ||
    password?.length < 8 ||
    passwordConfirm?.length < 8 ||
    password !== passwordConfirm;

  if (initialized) return <Navigate to={PATH.root} replace />;

  const doRegister = () => {
    if (disabled) return;
    if (password) {
      handleRegister(password);
    }
  };

  return (
    <>
      <h1>Register!</h1>

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
            handleBlur={() => {
              if (password?.length < 8) {
                setPasswordError('Password must be a minimum of 8 characters!');
                return;
              }

              setPasswordError(undefined);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordField
            label={'Password confirmation'}
            value={passwordConfirm}
            onChange={(value) => {
              setPasswordConfirm(value);
              setPasswordConfirmError(undefined);
            }}
            errorMessage={passwordConfirmError}
            handleBlur={() => {
              if (passwordConfirm?.length < 8) {
                setPasswordConfirmError(
                  'Password must be a minimum of 8 characters!'
                );
                return;
              }

              if (password !== passwordConfirm) {
                setPasswordConfirmError(
                  'Passwords do not match. Please ensure that the two passwords entered are identical!'
                );
                return;
              }

              setPasswordConfirmError(undefined);
            }}
          />
        </Grid>

        <Grid item pt={2} xs={12} textAlign={'center'}>
          <Button
            variant={'contained'}
            disabled={disabled}
            onClick={doRegister}
            startIcon={<PersonAdd />}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
