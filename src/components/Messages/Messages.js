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
        numUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: []

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
            
            }
        })

        const plural = uniqueNames.length > 1 || uniqueNames.length === 0 ? 's' : ''
        const numUsers = `${uniqueNames.length} user${plural}`;
        this.setState({
            numUsers: numUsers
        })
    }

    handleSearchChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const filteredMessages = [];

        const searchedMessages = channelMessages.map(message => {
            if(message.content && message.content.match(regex)) {
                filteredMessages.push(message);
            } 

            this.setState({
                searchResults: filteredMessages
            })
        });

    }

    render() {
        const {messagesRef, channel, currentUser, messages, searchResults, searchTerm} = this.state;

        return (
            <React.Fragment>
               
                    <MessagesHeader handleSearchChange={this.handleSearchChange} displayChannelName={this.displayChannelName(this.state.channel)} numUsers={this.state.numUsers}/>
                    <Segment >
                        <Comment.Group className="messages">
                            {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
                        </Comment.Group>
                    </Segment>

                <MessagesForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser}/>
            </React.Fragment>
        );
    }
}

export default Messages;