import React from "react";
import User from "../User/User";
import "./UserList.css";

export default class UserList extends React.Component {
  state = { anyUserInEdit: false };
  changeAnyUserInEditState = (boolean) => {
    this.setState({ anyUserInEdit: boolean });
  };
  renderUsers = () => {
    return this.props.usersData.map((user) => {
      return (
        <User
          key={user.id}
          user={user}
          getUsersData={this.props.getUsersData}
          anyUserInEdit={this.state.anyUserInEdit}
          changeAnyUserInEditState={this.changeAnyUserInEditState}
        />
      );
    });
  };
  render() {
    return (
      <div className="user-list">
        <div className="user list-header">
          <div className="id">ID</div>
          <div className="avatar"></div>
          <div className="user-name">Name</div>
          <div className="created-at">Created</div>
        </div>
        {this.renderUsers()}
      </div>
    );
  }
}
