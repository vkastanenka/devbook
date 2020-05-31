// React
import { Component } from "react";
import { withRouter } from "react-router-dom";

// HOC so that new pages always scroll to the top when redirecting
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
