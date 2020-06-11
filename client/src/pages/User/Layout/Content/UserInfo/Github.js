// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Spinner from "../../../../../components/Spinner/Spinner";

// 5 most recent github repositories from githubusername in profile
class Github extends Component {
  state = {
    clientId: "26c196bacea7db10cf48",
    clientSecret: "0885cb690e07d2a93a6afb0891fb552fd9f7aa53",
    count: 5,
    sort: "created: asc",
    loadingRepos: false,
    errors: "",
    repos: [],
  };

  async componentDidMount() {
    const { user } = this.props.users.user;
    if (user.profile && user.profile.githubusername) {
      const { githubusername } = user.profile;
      const { count, sort, clientId, clientSecret } = this.state;

      // State associated with checking if user even has any repositories on their github
      this.setState({ loadingRepos: true });

      await fetch(
        `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({ repos: data, loadingRepos: false });
        })
        .catch((err) => this.setState({ errors: err, loadingRepos: false }));
    }
  }

  render() {
    let content, repoItems;
    const { user } = this.props.users.user;
    const { loadingRepos, repos, errors } = this.state;

    if (!user.profile) {
      return (
        <div className="content-card__content--user-info flex flex--abs-center">
          <p className="text-primary content-card__no-info">
            This user has not yet created their developer profile
          </p>
        </div>
      );
    } else if (user.profile && !user.profile.githubusername) {
      return (
        <div className="content-card__content--user-info flex flex--abs-center">
          <p className="text-primary content-card__no-info">
            This user has not provided their Github username
          </p>
        </div>
      );
    } else if (user.profile) {
      if (loadingRepos && repos.length === 0) {
        content = <Spinner />;
      } else if (!loadingRepos && repos.length === 0) {
        content = (
          <div className="content-card__content--user-info flex flex--abs-center">
            <p className="text-primary">
              This user has no repositories associated with their Github account
            </p>
          </div>
        );
      } else if (errors) {
        content = (
          <div className="content-card__content--user-info flex flex--abs-center">
            <p className="text-primary">
              There was an error retrieving this user's repositories, please try
              again later!
            </p>
          </div>
        );
      } else {
        repoItems = repos.map((repo) => (
          <li className="content-card__list-entry repository" key={repo.id}>
            <a
              rel="noopener noreferrer"
              href={repo.html_url}
              target="_blank"
              className="link-style"
            >
              <h3 className="heading-tertiary fw-medium">{repo.name}</h3>
            </a>
            <div className="repository__statistics">
              <p className="repository__statistics--stars text-secondary">
                <span className="fw-medium">Stars:</span>{" "}
                {repo.stargazers_count}
              </p>
              <p className="repository__statistics--watchers text-secondary">
                <span className="fw-medium">Watchers:</span>{" "}
                {repo.watchers_count}
              </p>
              <p className="repository__statistics--forks text-secondary">
                <span className="fw-medium">Forks:</span> {repo.forks_count}
              </p>
            </div>

            <p className="text-primary">{repo.description}</p>
          </li>
        ));
        content = (
          <div className="content-card__content content-card__content--user-info">
            <ul className="content-card__list">{repoItems}</ul>
          </div>
        );
      }
      return content;
    }
  }
}

Github.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Github);
