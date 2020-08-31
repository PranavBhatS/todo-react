import React, { Component } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./../App.css";
import firebase from "./../../firebase";
import md5 from "md5";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConformation: "",
      errors: [],
      loading: false,
      userRef:firebase.database().ref("users")
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    this.setState({ errors: [] });
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.setState({ errors: [], loading: false });
              this.saveUser(createdUser).then(() => {
                console.log("saved");
              });
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };
  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "fill in all the fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConformation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConformation.length
    );
  };
  isPasswordValid = ({ password, passwordConformation }) => {
    if (password.length < 6 || passwordConformation.length < 6) return false;
    else if (password !== passwordConformation) return false;
    else return true;
  };
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };
  displayErrros = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  saveUser = (createdUser) => {
      return this.state.userRef.child(createdUser.user.uid).set({
          name:createdUser.user.displayName,
          avatar:createdUser.user.photoURL
      })
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConformation,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for pbchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                className={this.handleInputError(errors, "username")}
                value={username}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="email"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, "password")}
              />
              <Form.Input
                fluid
                name="passwordConformation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Conformation"
                onChange={this.handleChange}
                type="password"
                value={passwordConformation}
                className={this.handleInputError(errors, "password")}
              />
              <Button
                className={loading ? "loading" : ""}
                disabled={loading}
                color="orange"
                type="submit"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h5>Error</h5>
              {this.displayErrros(errors)}
            </Message>
          )}
          <Message>
            Already a user?<Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
