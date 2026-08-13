import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import App from "./App";

import store from "./redux/store";

import "@/styles/globals.css";

import ThemeProvider from "./context/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider >
      <BrowserRouter>
        <Toaster position="top-right" />

        <App />
      </BrowserRouter>

      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

