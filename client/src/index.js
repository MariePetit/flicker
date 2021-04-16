import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FlickerProvider } from "./Global/FlickerContext";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FlickerProvider>
        <App />
      </FlickerProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
