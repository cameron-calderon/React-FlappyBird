import React from "react";
import { View } from "react-native";

const Bird = ({ BirdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 60;
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: BirdBottom - birdHeight / 2,
      }}
    />
  );
};
export default Bird;
