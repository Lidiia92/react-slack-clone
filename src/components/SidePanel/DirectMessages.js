import React from 'react';
import firebase from '../../firebase';
import {connect} from 'react-redux';
import {setCurrentChannel, setPrivateChannel} from '../../actions';
import {Menu, Icon} from 'semantic-ui-react';


class DirectMessages extends React.Component {

    state = {
        activeChannel: '',
        users: [],
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence')
    }

    componentDidMount() {
        if(this.state.user){
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = currentUserID => {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap => {
            if(currentUserID !== snap.key) {
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({users: loadedUsers});
            }
        });

        this.state.connectedRef.on('value', snap => {
            if(snap.val() === true) {
                const ref = this.state.presenceRef.child(currentUserID);
                ref.set(true);
                ref.onDisconnect().remove(err => {
                    if(err !== null) {
                        console.log(err);
                    }
                })
            }
        });

        this.state.presenceRef.on('child_added', snap => {
            if(currentUserID !== snap.key) {
                this.addStatusToUser(snap.key);
            }
        });

        this.state.presenceRef.on('child_removed', snap => {
            if(currentUserID !== snap.key) {
                this.addStatusToUser(snap.key, false)
            }
        });
    }


    addStatusToUser = (userID, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {
            if(user.uid === userID) {
                user['status'] = `${connected ? 'online' : 'offline'}`
            }
            return acc.concat(user);
        }, []);

        this.setState({users: updatedUsers});
    }

    isUserOnline = user => user.status === 'online';

    changeChannel = user => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
            id: channelId,
            name: user.name
        };
        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.setActiveChannel(user.uid);
    }

    getChannelId = (userId) => {
        const currentUserId = this.state.user.uid;
        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    }

    setActiveChannel = (userId) => {
        this.setState({activeChannel: userId});
    }

    render() {
        const {users, activeChannel} = this.state

        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail"/> DIRECT MESSAGES
                    </span>({' '})
                    ({users.length})
                </Menu.Item>
                {users.map(user => <Menu.Item active={user.uid === activeChannel} key={user.uid} onClick={() => this.changeChannel(user)} style={{opacity: '0.7', fontStyle: 'italic'}}>
                    <Icon name="circle" className={this.isUserOnline(user) ? 'online' : 'offline'}/>
                    @ {user.name}
                </Menu.Item>)}
            </Menu.Menu>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setCurrentChannel: (channelData) => dispatch(setCurrentChannel(channelData)),
      setPrivateChannel: (isPrivateChannel) => dispatch(setPrivateChannel(isPrivateChannel))
    };
  };

export default connect(null, mapDispatchToProps)(DirectMessages);