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
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      email: "",
      password: "",
      errors: [],
      loading: false,
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
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(signInUser=>{
        console.log(signInUser);
      })
      .catch(err=>{
        this.setState({ errors: this.state.errors.concat(err),loading: false });
      })
    }
  };
  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "fill in all the fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ email, password }) => {
    return (
      !email.length ||
      !password.length
    );
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
 
  render() {
    const {
      email,
      password,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="codiepie" color="violet" />
            Login to pbchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
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
              <Button
                className={loading ? "loading" : ""}
                disabled={loading}
                color="violet"
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
            Not an existing user?<Link to="/Register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
