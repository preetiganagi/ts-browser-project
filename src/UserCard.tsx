import React, { Component } from "react";

// Define an interface for props
interface UserProps {
  name: string;
  age: number;
}

// Define a class component
class UserCard extends Component<UserProps> {
  render() {
    return (
      <div>
        <h1>Name: {this.props.name}</h1>
        <h2>Age: {this.props.age}</h2>
      </div>
    );
  }
}

export default UserCard;
