import React from "react";
import "./User.css";
import mockapi from "../../src/api/mockapi";

export default class User extends React.Component {
  state = { editMode: false };

  onEditButtonClick = () => {
    console.log(this.props.anyUserInEdit);
    if (!this.props.anyUserInEdit) {
      this.setState({ editMode: true });
      this.props.changeAnyUserInEditState(true);
    }
  };

  setEditModeToFalse = () => {
    this.setState({ editMode: false });
  };

  render() {
    const { user } = this.props;
    return (
      <>
        {this.state.editMode ? (
          <EditableUser
            user={user}
            setEditModeToFalse={this.setEditModeToFalse}
            getUsersData={this.props.getUsersData}
            changeAnyUserInEditState={this.props.changeAnyUserInEditState}
          />
        ) : (
          <NotEditableUser
            user={user}
            onEditButtonClick={this.onEditButtonClick}
            getUsersData={this.props.getUsersData}
          />
        )}
      </>
    );
  }
}
class NotEditableUser extends React.Component {
  onDeleteButtonClick = async (id) => {
    await mockapi.delete(`/users/${id}`);
    this.props.getUsersData();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <div className="id">{user.id}</div>
        <div className="avatar">
          <img alt="avatar" src={user.avatar} />
        </div>
        <div className="user-name">{user.name}</div>
        <div className="created-at">{user.createdAt.slice(0, 10)}</div>
        <button className="btn" onClick={this.props.onEditButtonClick}>
          Edit
        </button>
        <button
          className="btn"
          onClick={() => this.onDeleteButtonClick(user.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

class EditableUser extends React.Component {
  state = {
    nameInput: this.props.user.name,
    avatarInput: this.props.user.avatar,
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onUpdateButtonClick = async (id) => {
    await this.updateUserData(id);
    this.props.setEditModeToFalse();
    this.props.getUsersData();
  };

  updateUserData = async (id) => {
    await mockapi.put(`/users/${id}`, {
      name: this.state.nameInput,
      avatar: this.state.avatarInput,
    });
  };

  onCanceleButtonClick = () => {
    this.props.setEditModeToFalse();
    this.props.changeAnyUserInEditState(false);
    this.setState({
      nameInput: this.props.user.name,
      avatarInput: this.props.user.avatar,
    });
  };

  render() {
    const { user } = this.props;
    const { nameInput, avatarInput } = this.state;
    return (
      <div className="user">
        <div className="id">{user.id}</div>
        <div className="avatar">
          <input
            name="avatarInput"
            type="text"
            value={avatarInput}
            onChange={this.onInputChange}
          />
        </div>
        <input
          name="nameInput"
          type="text"
          value={nameInput}
          onChange={this.onInputChange}
        />
        <div className="created-at">{user.createdAt.slice(0, 10)}</div>
        <button
          className="btn"
          onClick={() => this.onUpdateButtonClick(user.id)}
        >
          Update
        </button>
        <button className="btn" onClick={this.onCanceleButtonClick}>
          Cancel
        </button>
      </div>
    );
  }
}
