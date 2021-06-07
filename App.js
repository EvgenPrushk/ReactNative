import React, { useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


import { TodoState } from "./src/context/todo/todoState";
import { ScreenState } from "./src/context/screen/ScreenState";
import { MainLayout } from "./src/MainLayout";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
