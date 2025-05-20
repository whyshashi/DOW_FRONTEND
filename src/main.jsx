import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "typeface-inter";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
