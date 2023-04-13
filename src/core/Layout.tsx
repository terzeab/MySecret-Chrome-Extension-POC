import { Key, Logout, RestartAlt } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMyContext } from './MyContext.tsx';

export function Layout() {
  const { loggedIn, handleLogout, handleResetStorage, loaded } = useMyContext();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid
            container
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Grid item style={{ display: 'flex' }}>
              <Key color={'primary'} fontWeight={'bold'} />
              <Typography pl={2} fontSize={'large'}>
                MySecret
              </Typography>
            </Grid>
            <Grid item style={{ display: 'flex' }}>
              {loggedIn && (
                <Tooltip title="Logout" arrow>
                  <Button style={{ minWidth: 3 }} onClick={handleLogout}>
                    <Logout />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="Reset extension" arrow>
                <Button style={{ minWidth: 3 }} onClick={handleResetStorage}>
                  <RestartAlt />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid mb={5} mx={3} minWidth={450} minHeight={250}>
        <Toolbar />

        {loaded && <Outlet />}
        {!loaded && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '200px'
            }}
          >
            <CircularProgress size={'50px'} />
          </Box>
        )}
      </Grid>
    </>
  );
}
