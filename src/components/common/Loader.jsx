import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <CircularProgress />
    </div>
  );
};

export default Loader;
