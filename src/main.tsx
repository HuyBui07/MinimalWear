import { createRoot } from "react-dom/client";
import AppWrapper from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWrapper />
    </PersistGate>
  </Provider>
);
