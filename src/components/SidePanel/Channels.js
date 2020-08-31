import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "./../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel,clearCurrentChannel } from "./../../actions";
class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    modal: false,
    channelName: "",
    channelDetail: "",
    channelRef: firebase.database().ref("channels"),
    firstLoad: true,
    activeChannel: "",
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };
componentWillUnmount() {
  this.state.channelRef.off("child_added",(snap)=>{
  })
  this.props.clearCurrentChannel()
}
  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.setActiveChannel(firstChannel);
      this.props.setCurrentChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };
  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        style={{ opacity: 0.7 }}
        name={channel.name}
        active={this.state.activeChannel === channel.id}
      >
        # {channel.name}
      </Menu.Item>
    ));

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;

  addChannel = () => {
    const {
      channelName: name,
      channelDetail: detail,
      channelRef,
      user,
    } = this.state;
    const id = channelRef.push().key;
    const newChannel = {
      id,
      name,
      detail,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    channelRef
      .child(id)
      .update(newChannel)
      .then(() => {
        this.setState({
          channelDetail: "",
          channelName: "",
        });
        this.closeModal();
      })
      .catch((er) => console.warn(er));
  };
  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length})<Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* channels */}
          {this.displayChannels(this.state.channels)}
        </Menu.Menu>
        <Modal basic open={modal} onClose={() => this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the channel"
                  name="channelDetail"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel,clearCurrentChannel })(Channels);
