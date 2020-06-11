// React
import React from "react";
import { Link } from "react-router-dom";

// Page for undefined routes
const ErrorPage = () => {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h1 className="heading-primary font-megrim landing__heading">
            404 Not Found
          </h1>
          <h2 className="heading-secondary">
            Sorry, the page you are looking for does not exist!
          </h2>
          <h3 className='heading-tertiary'>
            <Link to="/" className='link-style'>Click here to get back!</Link>
          </h3>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
