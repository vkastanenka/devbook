// React
import React, { Component } from "react";

// Components
import Login from "../Forms/Login";
import Register from "../Forms/Register";

class LoginRegister extends Component {
  state = {
    registered: false,
    newUserLogin: false,
  };

  render() {
    const { registered, newUserLogin } = this.state;

    return (
      <div className="login-register">
        <div className="login-register__forms">
          <Login
            formClassName={
              registered
                ? "login-register__forms--login--active"
                : "login-register__forms--login"
            }
          />
          <Register
            formClassName={
              registered
                ? "login-register__forms--register"
                : "login-register__forms--register--active"
            }
          />
        </div>

        <div
          className={`login-register__overlay ${
            registered
              ? "login-register__overlay--login"
              : "login-register__overlay--register"
          }`}
        >
          <div
            className={
              registered
                ? "login-register__overlay--login-content"
                : "login-register__overlay--login-content--active"
            }
          >
            <h3 className="heading-tertiary ma-bt-lg">Already registered?</h3>
            <p className="text-primary ma-bt-md">
              Login to catch up on your latest feed
            </p>
            <button
              className="btn btn--ghost"
              onClick={() => this.setState({ registered: true })}
            >
              Login
            </button>
          </div>
          <div
            className={
              registered
                ? "login-register__overlay--register-content--active"
                : "login-register__overlay--register-content"
            }
          >
            <h3 className="heading-tertiary ma-bt-lg">
              {!newUserLogin ? "Not a member?" : "Thank you for registering"}
            </h3>
            <p className="text-primary ma-bt-md">
              {!newUserLogin
                ? "Registration with your email is quick and easy. Sign up and get started today."
                : "Please login to get started on creating your developer profile."}
            </p>
            {!newUserLogin ? (
              <button
                className="btn btn--ghost"
                onClick={() => this.setState({ registered: false })}
              >
                Register
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginRegister;
