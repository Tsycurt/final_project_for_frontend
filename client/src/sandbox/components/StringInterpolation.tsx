import React from "react";

const StringInterpolation = () => {
  const text = "hallo";
  console.log(text);
  const obj = { name: "Andy" };
  return <div>{obj.name}</div>;
};

export default StringInterpolation;
