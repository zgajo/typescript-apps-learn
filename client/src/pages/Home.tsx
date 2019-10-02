import React, { useState } from "react";

interface Props {}

export const Home: React.FC<Props> = () => {
  const [data] = useState("Home");
  return <div>{data}</div>;
};
