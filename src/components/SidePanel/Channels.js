import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {

    state = {
        channels: [], 
        modal: false,
        channelName: '',
        channelDetails: ''
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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                </Menu.Menu>

                {/* Add Channel Modal */}
                <Modal basic open={modal} onClose={this.closeModal} >
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form >
                            <Form.Field>
                                <Input fluid label="Name of Channel" name="channelName" onChange={this.handleChange} value={this.state.channelName}/>
                            </Form.Field>

                            <Form.Field>
                                <Input fluid label="About the Channel" name="channelDetails" onChange={this.handleChange} value={this.state.channelDetails}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button  color="green">
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

export default Channels;