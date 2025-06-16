import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/stores/store";
import Navigator from "./src/navigations/navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <PaperProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
