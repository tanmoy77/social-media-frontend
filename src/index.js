import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from './context/PostContext/PostContextProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
        <div id="portal"></div>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
