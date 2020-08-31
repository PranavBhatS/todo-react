import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "./../../firebase";
class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
    };
  }

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",

      text: <span>Change Avata</span>,
      disabled: false,
    },
    {
      key: "signout",
      text: <span onClick={() => this.handleSinout()}>Sign out</span>,
      disabled: false,
    },
  ];
  handleSinout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => console.log("signout"));
  };
  render() {
    const { user } = this.state;
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>PChat</Header.Content>
            </Header>
          <Header inverted style={{ padding: "0.25px" }} as="h4">
            <Dropdown
              trigger={
                <span>
                  {user.photoURL && (
                    <Image src={user.photoURL} spaced="left" avatar style={{marginRight:"10px"}}/>
                  )}
                  {this.state.user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            ></Dropdown>
          </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
