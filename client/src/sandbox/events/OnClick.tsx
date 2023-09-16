import React, { MouseEvent } from "react";
import Button from "@mui/material/Button";

const OnClick = () => {
  const handleClick = () => console.log("you clicked!!!");

  return (
    <Button variant="outlined" sx={{ m: 2 }} onClick={handleClick}>
      Click me!!!
    </Button>
  );
};


export default OnClick;
