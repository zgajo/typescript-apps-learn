import React from "react";
import { useByeQuery } from "../generated/graphql";

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>Loading . . . </div>;
  }

  if (error) {
    return <div>err</div>;
  }
  if (!data) {
    return <div>No data . . . </div>;
  }

  return <div>{data.bye}</div>;
};
