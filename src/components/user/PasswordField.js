import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import React, {  useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

function PasswordField({ passwordRef, id, label }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  
  return (
    <>
      <FormControl margin="normal" sx={{ width: "100%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          inputRef={passwordRef}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

export default PasswordField;
