import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: [],
    errors: ""
  };

  componentDidMount() {
    fetch("/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ courses: response.courses }))
      .catch(error => this.setState({ errors: error.message }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.courses.map(course => {
            return <li key={course.id}>{course.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Courses;
