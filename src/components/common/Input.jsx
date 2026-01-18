import { TextField } from "@mui/material";

const Input = ({ label, ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      size="small"
      {...props}
    />
  );
};

export default Input;
