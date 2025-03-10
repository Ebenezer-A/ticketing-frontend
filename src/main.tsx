import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
