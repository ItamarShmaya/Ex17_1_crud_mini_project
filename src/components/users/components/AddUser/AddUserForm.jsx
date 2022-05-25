import React from "react";
import "./AddUser.css";

export default class AddUserForm extends React.Component {
  state = { nameInput: "", avatarURL: "", editMode: false };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.state.editMode ? this.editUser() : this.addUser();
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  isValidName = (name) => {
    return name.length >= 5;
  };

  isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  addUser = () => {
    const user = {
      name: this.state.nameInput,
      avatar: this.state.avatarURL,
      createdAt: new Date().toISOString(),
    };
    if (
      this.isValidName(this.state.nameInput) &&
      this.isValidImageUrl(this.state.avatarURL)
    ) {
      this.setState({ nameInput: "", avatarURL: "" });
      this.props.onFormSubmit(user);
    } else {
      alert("invalid input");
    }
  };

  editUser = () => {};

  render() {
    return (
      <form className="add-user-form" onSubmit={this.onFormSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="nameInput"
            onChange={this.onInputChange}
            value={this.state.nameInput}
          />
        </div>
        <div className="input-group">
          <label>Avatar URL</label>
          <input
            type="text"
            name="avatarURL"
            onChange={this.onInputChange}
            value={this.state.avatarURL}
          />
        </div>
        <input
          className="btn"
          type="submit"
          value={this.state.editMode ? "Update" : "Add"}
          disabled={!this.props.userAdded}
        />
      </form>
    );
  }
}
