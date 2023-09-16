import React, { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton } from "@mui/material";

type Props = {
  onClick: () => void;
};

const MoreButton: FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
      <IconButton
        onClick={onClick}
        size="large"
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: "inline-flex", md: "none" } }}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

export default MoreButton;
