// React
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import store from "./store/store";
import { Provider } from "react-redux";

// Actions
import { setCurrentUser, logout } from "./store/actions/authActions";

// Utilities
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Components
import Landing from "./pages/Landing/Landing";
import User from "./pages/User/User";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Styling
import "./assets/css/style.css";

// Check for jwt
if (localStorage.jwtToken) {
  // Set authorization headers and user from jwt
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for token expiration and logout if expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/:token?" component={Landing} />
          <Route exact path="/user/:handle" component={User} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
