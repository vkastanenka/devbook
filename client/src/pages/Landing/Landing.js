// React
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import LoginRegister from "../../components/Cards/LoginRegister";

const Landing = () => {
  return (
    <main className="landing">
      <h1 className="heading-primary font-megrim landing__heading">DevConnector</h1>
      <LoginRegister />
    </main>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
