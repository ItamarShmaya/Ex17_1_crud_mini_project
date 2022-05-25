import React from "react";
import mockapi from "./api/mockapi.js";
import UserList from "./components/users/components/UserList/UserList.jsx";
import AddUserForm from "./components/users/components/AddUser/AddUserForm.jsx";
import "./index.css";

export default class App extends React.Component {
  state = { users: [], nextUserId: null, userAdded: true };

  componentDidMount = () => {
    this.getUsersData();
  };

  getUsersData = async () => {
    const response = await mockapi.get("/users");
    const nextUserId = response.data[response.data.length - 1].id + 1;
    this.setState({
      users: response.data,
      nextUserId,
    });
  };

  onFormSubmit = async (user) => {
    this.setState({ userAdded: false });
    user.id = this.state.nextUserId;
    this.addUserToDataBase(user);
  };

  addUserToDataBase = async (user) => {
    await mockapi.post("/users", user);
    await this.getUsersData();
    this.setState({ userAdded: true });
  };

  render() {
    return (
      <>
        <AddUserForm
          onFormSubmit={this.onFormSubmit}
          userAdded={this.state.userAdded}
        />
        <UserList
          usersData={this.state.users}
          getUsersData={this.getUsersData}
        />
      </>
    );
  }
}
