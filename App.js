import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const birdLeft = screenWidth / 2;
  const [BirdBottom, setBirdBottom] = useState(screenHeight / 2);
  const gravity = 3;
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [score, setScore] = useState(0);

  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [isGameOver, setIsGameOver] = useState(false);
  //Falling effect
  useEffect(() => {
    if (BirdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((BirdBottom) => BirdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [BirdBottom]);
  console.log(BirdBottom);

  const jump = () => {
    if (!isGameOver && BirdBottom < screenHeight) {
      setBirdBottom((BirdBottom) => BirdBottom + 50);
    }
  };

  //First obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  //Second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  //Collisions
  useEffect(() => {
    if (
      ((BirdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        BirdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((BirdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        BirdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log("game over");
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird BirdBottom={BirdBottom} birdLeft={birdLeft} />

        <Obstacles
          color={"green"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
        />
        <Obstacles
          color={"yellow"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          obstaclesLeft={obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
