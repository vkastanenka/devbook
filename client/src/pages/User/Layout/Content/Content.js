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
    addingEducation: false,
    addingExperience: false,
  };

  render() {
    let credentialsCard;
    const { viewingUser } = this.state;

    if (viewingUser === "education") {
      credentialsCard = (
        <ContentCard
          icon={true}
          iconType="plus"
          iconOnClick={() => {
            this.setState({ addingEducation: true });
          }}
          toggleCardRight={() => {
            this.setState({ viewingUser: "experience" });
          }}
          heading="Education"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Education />
        </ContentCard>
      );
    } else if (viewingUser === "experience") {
      credentialsCard = (
        <ContentCard
          icon={true}
          iconType="plus"
          iconOnClick={() => {
            this.setState({ addingExperience: true });
          }}
          toggleCardLeft={() => {
            this.setState({ viewingUser: "education" });
          }}
          toggleCardRight={() => {
            this.setState({ viewingUser: "github" });
          }}
          heading="Education"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Experience />
        </ContentCard>
      );
    } else if (viewingUser === "github") {
      credentialsCard = (
        <ContentCard
          toggleCardLeft={() => {
            this.setState({ viewingUser: "experience" });
          }}
          heading="Github"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Github />
        </ContentCard>
      );
    }

    return (
      <div className="user__content content">
        <ContentCard
          heading="Timeline"
          cardClassName="content-card--dark content-card--box-shadow"
        >
          <Timeline />
        </ContentCard>
        {credentialsCard}
      </div>
    );
  }
}

export default Content;
