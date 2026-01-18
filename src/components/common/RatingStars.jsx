import { Rating } from "@mui/material";

const RatingStar = ({
  value = 0,
  readOnly = false,
  size = "small",
  precision = 0.5,
  onChange,
}) => {
  return (
    <Rating
      value={value}
      readOnly={readOnly}
      size={size}
      precision={precision}
      onChange={(e, newValue) => onChange?.(newValue)}
    />
  );
};

export default RatingStar;
