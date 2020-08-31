import React from "react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Message from "./Message/Message";
import MetaPanel from "./MetaPanel/MetaPanel";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
const App = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />
    <Grid.Column style={{marginLeft:320}}>
      <Message />
    </Grid.Column>
    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(App);
