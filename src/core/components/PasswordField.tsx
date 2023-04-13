import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

export const PasswordField = ({
  label,
  value,
  onChange,
  errorMessage,
  handleBlur
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      label={label}
      value={value}
      onBlur={() => {
        if (!!handleBlur) handleBlur();
      }}
      error={!!errorMessage}
      helperText={errorMessage}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              tabIndex="-1"
              aria-label="toggle password visibility"
              onClick={handleTogglePassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth
    />
  );
};
