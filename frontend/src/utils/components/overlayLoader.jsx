import { Box, CircularProgress } from "@mui/material";

const OverlayLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center Circular Loader */}
      <CircularProgress color="primary" />
    </Box>
  );
};

export default OverlayLoader;
