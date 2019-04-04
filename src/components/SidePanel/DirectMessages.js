import React from 'react';
import firebase from '../../firebase';
import {Menu, Icon} from 'semantic-ui-react';


class DirectMessages extends React.Component {

    state = {
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

    isUserOnline = user => user.status === 'online'

    render() {
        const {users} = this.state

        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail"/> DIRECT MESSAGES
                    </span>({' '})
                    ({users.length})
                </Menu.Item>
                {users.map(user => <Menu.Item key={user.uid} onClick={() => console.log(user)} style={{opacity: '0.7', fontStyle: 'italic'}}>
                    <Icon name="circle" className={this.isUserOnline(user) ? 'online' : 'offline'}/>
                    @ {user.name}
                </Menu.Item>)}
            </Menu.Menu>
        );
    }
}

export default DirectMessages;