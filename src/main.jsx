import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";

import theme from "./configs/theme";
import App from "./App";

import "./index.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

console.log(
  "%cCharles Chan",
  "color:#666;font-family:sans-serif;letter-spacing:2px;font-size:26px;font-weight:700;text-shadow:1px 1px 0 #A0E7FE,2px 2px 1px rgba(0,0,0,.3)"
);
console.log("%csource: https://github.com/charles5991", "font-size:15px");
