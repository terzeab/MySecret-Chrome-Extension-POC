import { CopyAll, Refresh } from '@mui/icons-material';
import { Button, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useMyContext } from '../MyContext.tsx';

export const DisplaySecret = () => {
  const { handleRegenerateToken, secret } = useMyContext();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(secret ?? '')
      .then(() => {
        console.log('Text copied to clipboard:', secret);
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
      });
  };

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={10}>
        <Typography
          sx={{
            border: '1px dashed #BBB',
            borderRadius: 1,
            padding: '8px',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            background: '#FFFFFF22'
          }}
        >
          {secret}
        </Typography>
      </Grid>
      <Grid item xs={2} textAlign={'center'} style={{ display: 'flex' }}>
        <Tooltip title="Regenerate secret" arrow>
          <Button style={{ minWidth: 3 }} onClick={handleRegenerateToken}>
            <Refresh />
          </Button>
        </Tooltip>
        <Tooltip title="Copy" arrow>
          <Button style={{ minWidth: 3 }} onClick={handleCopy}>
            <CopyAll />
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
