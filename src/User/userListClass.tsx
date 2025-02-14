/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component } from "react";
import User from "./user"; 

type UserListProps = object 
const user1: User = {
    'id': 1,
    'name': 'Preeti',
    'email': 'p@gmail.com',
    'age': 27,

}
const user2: User = {
    'id': 2,
    'name': 'Preeti',
    'email': 'p@gmail.com',
    'age': 27,

}
const user3: User = {
    'id': 2,
    'name': 'Preeti',
    'email': 'p@gmail.com',
    'age': 27,

}
interface UserListState {
  users: User[]
}
const userListState: UserListState = {
    users: [user1, user2, user3], 
  };

export default class UserList extends Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props); 

    this.state = {
      users: userListState.users,
    };
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
        {this.state.users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <ul>
            {this.state.users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}