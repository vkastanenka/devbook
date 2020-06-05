// React
import React, { Component } from "react";

// Components
import Timeline from "./Timeline/Timeline";
import ContentCard from "../../../../components/Cards/Content";

class Content extends Component {
  render() {
    return (
      <div className="user__content content">
        <ContentCard heading="Timeline" cardClassName='content-card--dark content-card--box-shadow'>
          <Timeline />
        </ContentCard>
        <div className="contact__user-info"></div>
      </div>
    );
  }
}

export default Content;
