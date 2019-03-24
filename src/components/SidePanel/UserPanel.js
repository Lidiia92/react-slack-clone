import React from 'react';
import firebase from '../../firebase';
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react';


class UserPanel extends React.Component {
    
    state = {
        user: this.props.currentUser
    }


    dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },

        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },

        {
            key: "signout",
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        }
    ]

    handleSignOut = async () => {
        await firebase.auth().signOut();
    }

    render () {
        const {user} = this.state;
        console.log(user);
        return (
            <Grid style={{background: '#4c3c4c', width: '100%'}}>
                <Grid.Column style={{paddingLeft: '2em'}}>
                    <Grid.Row style={{padding: '1.2em', margin: 0}}>
                        {/* App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/>
                            <Header.Content style={{fontSize: '2rem'}}>DevChat</Header.Content>
                        </Header>

                        {/* User Dropdown */}
                        <Header style={{padding: '0.25rem'}} as="h4" inverted>
                            <Dropdown trigger={<span><Image src={user.photoURL} spaced="right" avatar/>{user.displayName}</span>} options={this.dropdownOptions()}/>
                        </Header>

                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}


export default UserPanel;