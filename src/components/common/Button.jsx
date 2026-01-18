import { Button as MuiButton } from "@mui/material";

const Button = ({
  children,
  variant = "contained",
  color = "primary",
  className = "",
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
