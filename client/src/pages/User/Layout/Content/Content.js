// React
import React, { Component } from "react";

// Components
import Timeline from "./Timeline/Timeline";
import Education from "./UserInfo/Education";
import Experience from "./UserInfo/Experience";
import Github from "./UserInfo/Github";
import ContentCard from "../../../../components/Cards/Content";

class Content extends Component {
  state = {
    viewingUser: "education",
  };

  render() {
    return (
      <div className="user__content content">
        <ContentCard
          heading="Timeline"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Timeline />
        </ContentCard>
        <ContentCard
          heading="Experience"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Experience />
        </ContentCard>
      </div>
    );
  }
}

export default Content;
