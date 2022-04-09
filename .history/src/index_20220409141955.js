import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let defaultState = [
  // { id: 0, name: "good shoes", quantity: 1, price: 100 },
  // { id: 1, name: "air Max 97", quantity: 1, price: 200 },
  // { id: 2, name: "NB 993", quantity: 1, price: 250 },
  // { id: 3, name: "bad shoes", quantity: 1, price: 10 },
  // { id: 4, name: "slippers", quantity: 1, price: 90 },
  // { id: 5, name: "baby shoes", quantity: 1, price: 500 },
];

let alertDefault = true;

let store = createStore(combineReducers({ reducer, reducer2 }));

function reducer(state = defaultState, action) {
  let setState = [...state];

  if (action.type === "order") {
    const sameProduct = setState.find((e) => e.id == action.payload.id);
    if (sameProduct) {
      sameProduct.quantity++;
      return setState;
    } else {
      setState.push(action.payload);
      return setState;
    }
  }

  if (action.type === "increase") {
    console.log(action.payload.id);
    const sameProduct = setState.find((e) => e.id == action.payload.id);
    if (sameProduct) {
      sameProduct.quantity++;
      return setState;
    }
  } else if (action.type === "decrease") {
    const sameProduct = setState.find((e) => e.id == action.payload.id);
    if (sameProduct && sameProduct.quantity > 0) {
      sameProduct.quantity--;
      return setState;
    }
  }
  {
    return state;
  }
}

function reducer2(state = alertDefault, action) {
  let setState = state;
  if (action.type === "exitAlert") {
    setState = false;
    return setState;
  } else return setState;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
