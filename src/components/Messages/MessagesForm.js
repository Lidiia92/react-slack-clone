import React from 'react';
import firebase from '../../firebase';
import {Segment, Button, Input} from 'semantic-ui-react';

class MessagesForm extends React.Component {

    state = {
        message: '',
        channel: this.props.currentChannel,
        currentUser: this.props.currentUser,
        loading: false,
        errors: []
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createMessage = () => {
        console.log('current user', this.state.currentUser.uid)
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.currentUser.uid,
                name: this.state.currentUser.displayName,
                avatar: this.state.currentUser.photoURL
            },
            content: this.state.message
        }

        return message;
    }

    sendMessage = async () => {
        const { messagesRef } = this.props;
        const newMessage = this.state.message;
        const { channel } = this.state;

        if(newMessage) {
            try {
                this.setState({loading: true});
                const added = await messagesRef.child(channel.id).push().set(this.createMessage());
                this.setState({loading: false, message: '', errors: []})
            } catch (err) {
                console.error(err);
                this.setState({loading: false, errors: this.state.errors.concat(err)})
            }  
        } else {
            this.setState({
                errors: this.state.errors.concat({message: "Add a message."})
            });
        }
    }


    render() {

        const {errors, loading} = this.state;

        return(
            <Segment className="messages__form">
                <Input fluid name="message" style={{marginBottom: '0.7em'}} label={<Button icon="add" />} labelPosition="left" placeholder="Write your message" onChange={this.handleChange} value={this.state.message} className={errors.some( error => error.message.includes('message')) ? 'error' : ''}/>

                <Button.Group icon width="2">
                    <Button color="orange" content="Add Reply" labelPosition="left" icon="edit" onClick={this.sendMessage} disabled={loading}/>
                    <Button color="green" content="Upload Media" labelPosition="right" icon="cloud upload"/>
                </Button.Group>
            </Segment>
        );
    }
}

export  default MessagesForm;