// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../../../../components/Icon/Icon";

// List of skills from developer profile
const SkillsList = (props) => {
  const skills = props.skills.map((skill) => {
    return (
      <li className="profile__skills-list-item" key={skill}>
        <Icon type="controller-volume" className="icon--large icon--primary" />
        <span>{skill}</span>
      </li>
    );
  });

  return skills;
};

SkillsList.propTypes = {
  skills: PropTypes.array.isRequired,
};

export default SkillsList;
