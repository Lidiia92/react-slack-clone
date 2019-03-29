import React from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';

class Messages extends React.Component {

    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        currentUser: this.props.currentUser
    }

    render() {
        const {messagesRef, channel, currentUser} = this.state;

        return (
            <React.Fragment>
                <MessagesHeader />
                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>

                <MessagesForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser}/>
            </React.Fragment>
        );
    }
}

export default Messages;