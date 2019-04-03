import React from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';
import Message from './Message';

class Messages extends React.Component {

    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        currentUser: this.props.currentUser,
        messages: [],
        messagesLoading: true,
        numUsers: ''

    }

    componentDidMount() {
        const { channel, currentUser} = this.state;

        if(channel && currentUser) {
            this.addListeners(channel.id);
        }

    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
            this.countUniqueUsers(loadedMessages);
        })
    }

    displayMessages = messages => {
        if(messages.length > 0) {
            const displayed = messages.map(message => <Message key={message.timestamp} message={message} user={this.state.currentUser}/>)
            return displayed;
        }
    }

    
    displayChannelName = channel => channel ? `#${channel.name}` : '';

    countUniqueUsers = (messages) => {
        const uniqueNames = [];
        const uniqueUsers = messages.map(message => {
            if(!uniqueNames.includes(message.user.name)) {
                uniqueNames.push(message.user.name);
                console.log(uniqueNames)
            }
        })

        const numUsers = `${uniqueNames.length} users`;
        this.setState({
            numUsers: numUsers
        })
    }

    render() {
        const {messagesRef, channel, currentUser, messages} = this.state;

        return (
            <React.Fragment>
               
                    <MessagesHeader displayChannelName={this.displayChannelName(this.state.channel)} numUsers={this.state.numUsers}/>
                    <Segment >
                        <Comment.Group className="messages">
                            {this.displayMessages(messages)}
                        </Comment.Group>
                    </Segment>

                <MessagesForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser}/>
            </React.Fragment>
        );
    }
}

export default Messages;