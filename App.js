import React from "react";
import { Provider } from "react-redux";
import {store} from "./src/stores/store"
import Navigator from "./src/navigations/navigator";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
