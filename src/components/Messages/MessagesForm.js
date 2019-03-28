import React from 'react';
import {Segment, Button, Input} from 'semantic-ui-react';

class MessagesForm extends React.Component {
    render() {
        return(
            <Segment className="messages__form">
                <Input fluid name="message" style={{marginBottom: '0.7em'}} label={<Button icon="add" />} labelPosition="left" placeholder="Write your message"/>

                <Button.Group icon width="2">
                    <Button color="orange" content="Add Reply" labelPosition="left" icon="edit"/>
                    <Button color="green" content="Upload Media" labelPosition="right" icon="cloud upload"/>
                </Button.Group>
            </Segment>
        );
    }
}

export  default MessagesForm;