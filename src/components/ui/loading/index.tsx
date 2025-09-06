import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-white dark:bg-black">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
