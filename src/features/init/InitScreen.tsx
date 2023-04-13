import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useMyContext } from '../../core/MyContext.tsx';
import { DisplaySecret } from '../../core/components/DisplaySecret.tsx';
import { PATH } from './../../core/Router.tsx';

export function InitScreen() {
  const theme = useTheme();
  const { initialized } = useMyContext();

  if (initialized) return <Navigate to={PATH.root} replace />;

  return (
    <>
      <h1>Welcome!</h1>

      <Grid container spacing={0} alignItems="center">
        <DisplaySecret />

        <Grid item pt={2} xs={12}>
          <Typography>
            To store this secret you need to{' '}
            <NavLink
              style={{ color: theme.palette.primary.main }}
              activeStyle={{ color: theme.palette.primary.dark }}
              to={PATH.register}
            >
              register
            </NavLink>
            !
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
