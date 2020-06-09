// React
import React, { Component } from "react";

// Components
import Timeline from "./Timeline/Timeline";
import Education from "./UserInfo/Education";
import Experience from "./UserInfo/Experience";
import Github from "./UserInfo/Github";
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";
import Popup from "../../../../components/HigherOrder/Popup";
import EducationForm from "../../../../components/Forms/Education";
import ExperienceForm from "../../../../components/Forms/Experience";
import ContentCard from "../../../../components/Cards/Content";

class Content extends Component {
  state = {
    viewingUser: "education",
    addingEducation: false,
    addingExperience: false,
  };

  render() {
    let credentialsCard, popupCard;
    const { viewingUser, addingEducation, addingExperience } = this.state;

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
          heading="Experience"
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

    if (addingEducation) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Add Education"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ addingEducation: false });
            }}
          >
            <EducationForm />
          </ContentCard>
        </Popup>
      );
    } else if (addingExperience) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Add Experience"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ addingExperience: false });
            }}
          >
            <ExperienceForm />
          </ContentCard>
        </Popup>
      );
    }

    return (
      <Auxiliary>
        {popupCard}
        <div className="user__content content">
          <ContentCard
            heading="Timeline"
            cardClassName="content-card--dark content-card--box-shadow"
          >
            <Timeline />
          </ContentCard>
          {credentialsCard}
        </div>
      </Auxiliary>
    );
  }
}

export default Content;
