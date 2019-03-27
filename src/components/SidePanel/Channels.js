import React from 'react';
import {connect} from 'react-redux';
import { setCurrentChannel } from '../../actions/index';
import firebase from '../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {

    state = {
        user: this.props.currentUser,
        channels: [], 
        modal: false,
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        firstload: true,
        activeChannel: ''
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({
                channels: loadedChannels
            },
            () => this.setFirstChannel());
        });
    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if(this.state.firstload && this.state.channels.length > 0) {
            this.setActiveChannel(firstChannel);
            this.props.setCurrentChannel(firstChannel);
        }
        this.setState({
            firstload: false,

        });
    }

    openModal = () => {
        this.setState({
            ...this.state,
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            modal: false
        })
    }

    handleSubmit = (event) => {
        const {channelName, channelDetails} = this.state;
        event.preventDefault();
        if (this.isFormValid(channelName, channelDetails)) {
            this.addChannel();
        }
    }

    isFormValid = (channelName, channelDetails) => channelName && channelDetails;

    addChannel = async () => {

        const { channelsRef, channelName, channelDetails, user} = this.state;

        //unique key for every new channel that added
        const key = channelsRef.push().key;
        console.log('channelsRef', channelsRef)
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        try {
            await channelsRef.child(key).update(newChannel);
            this.setState({
                ...this.state,
                channelName: '',
                channelDetails: ''
            });
            this.closeModal();
        } catch (err) {
            console.error(err);
        }

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
    }

    setActiveChannel = (channel) => {
        this.setState({
            activeChannel: channel.id
        })
    }

    displayChannels = (channels) => {
        const displayedChannels = channels.length > 0 && channels.map(channel => (
        
            <Menu.Item key={channel.id} onClick={() => this.changeChannel(channel)} name={channel.name} style={{opacity: '0.7'}} active={channel.id === this.state.activeChannel}>
            
                # {channel.name}
            
            </Menu.Item>
        
        ))
        return displayedChannels;
    }

    render() {

        const {channels, modal} = this.state;

        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom: '2em'}}>
                    <Menu.Item>
                        <span><Icon name="exchange"/> CHANNELS </span>
                        ({channels.length}) <Icon name="add" onClick={this.openModal} style={{cursor: 'pointer'}}/>
                    </Menu.Item>

                    {this.displayChannels(channels)}
                </Menu.Menu>

                {/* Add Channel Modal */}
                <Modal basic open={modal} onClose={this.closeModal} >
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label="Name of Channel" name="channelName" onChange={this.handleChange} value={this.state.channelName}/>
                            </Form.Field>

                            <Form.Field>
                                <Input fluid label="About the Channel" name="channelDetails" onChange={this.handleChange} value={this.state.channelDetails}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button  color="green" onClick={this.handleSubmit}>
                            <Icon name="checkmark"/> Add
                        </Button>

                        <Button  color="red" onClick={this.closeModal}>
                            <Icon name="remove"/> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setCurrentChannel: (channel) => dispatch(setCurrentChannel(channel)),
    };
  };

export default connect(null, mapDispatchToProps)(Channels);