import React from 'react';
import moment from 'moment';
import {Comment} from 'semantic-ui-react';

const Message = (props) => {

    const isOwnMessage = (message, user) => {
        return message.user.id === user.uid ? 'message_self' : ''
    }

    const timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow();
    }

    return (
        <Comment>
            <Comment.Avatar src={props.message.user.avatar}/>

            <Comment.Content className={isOwnMessage(props.message, props.user)}>
                <Comment.Author as="a">{props.message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(props.message.timestamp)}</Comment.Metadata>
                <Comment.Text>{props.message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}

export default Message;