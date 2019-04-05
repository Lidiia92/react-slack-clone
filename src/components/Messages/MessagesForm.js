import React from 'react';
import uuidv4 from 'uuid/v4';
import firebase from '../../firebase';
import {Segment, Button, Input} from 'semantic-ui-react';

import FileModal from './FileModal';
import ProgressBar from './ProgressBar';

class MessagesForm extends React.Component {

    state = {
        message: '',
        channel: this.props.currentChannel,
        currentUser: this.props.currentUser,
        loading: false,
        errors: [],
        modal: false,
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        percentUploaded: 0
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createMessage = (fileurl = null) => {
        console.log('current user', this.state.currentUser.uid)
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.currentUser.uid,
                name: this.state.currentUser.displayName,
                avatar: this.state.currentUser.photoURL
            },
        };

        if (fileurl !== null) {
            message['image'] = fileurl;
        } else {
            message['content'] = this.state.message;
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

    getPath = () => {
        if(this.props.privateChannel) {
            return `chat/private-${this.state.channel.id}`;
        } else {
            return `chat/public`;
        }
    }

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef;
        const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
    
        this.setState(
          {
            uploadState: "uploading",
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
          },
          () => {
            this.state.uploadTask.on(
              "state_changed",
              snap => {
                const percentUploaded = Math.round(
                  (snap.bytesTransferred / snap.totalBytes) * 100
                );
                this.setState({ percentUploaded });
              },
              err => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              },
              () => {
                this.state.uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then(downloadUrl => {
                    this.sendFileMessage(downloadUrl, ref, pathToUpload);
                  })
                  .catch(err => {
                    console.error(err);
                    this.setState({
                      errors: this.state.errors.concat(err),
                      uploadState: "error",
                      uploadTask: null
                    });
                  });
              }
            );
          }
        );
      };

    sendFileMessage = (downloadURL, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(downloadURL))
            .then (() => {
                this.setState({uploadState: 'done'})
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })

    }


    render() {

        const {errors, loading, modal, uploadState, percentUploaded} = this.state;

        return(
            <Segment className="messages__form">
                <Input fluid name="message" style={{marginBottom: '0.7em'}} label={<Button icon="add" />} labelPosition="left" placeholder="Write your message" onChange={this.handleChange} value={this.state.message} className={errors.some( error => error.message.includes('message')) ? 'error' : ''}/>

                <Button.Group icon width="2">
                    <Button color="orange" content="Add Reply" labelPosition="left" icon="edit" onClick={this.sendMessage} disabled={loading}/>
                    <Button color="teal" content="Upload Media" labelPosition="right" icon="cloud upload" onClick={this.openModal} disabled={uploadState === "uploading"}/>
                </Button.Group>
                <FileModal modal={modal} closeModal={this.closeModal} uploadFile={this.uploadFile}/>
                <ProgressBar uploadState={uploadState} percentUploaded={percentUploaded}/>
            </Segment>
        );
    }
}

export  default MessagesForm;