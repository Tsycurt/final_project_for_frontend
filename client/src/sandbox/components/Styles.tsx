import React from "react";
import "./styles.css";

type Props = {
  sx: React.CSSProperties | object;
};

const Styles: React.FC<Props> = ({ sx = {} }) => {


  return (
    <>
      
      <h1 style={{ color: "blue", ...sx }}>five</h1>
      
    </>
  );
};

export default Styles;
