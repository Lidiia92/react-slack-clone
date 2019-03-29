import React  from 'react';
import {Grid} from 'semantic-ui-react';
import './App.css';
import {connect} from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = (props) => (
  <Grid columns='equal' className="app" style={{background: "#eee"}}>

	<Grid.Column width={3}>
       	<ColorPanel />
        <SidePanel currentUser={props.currentUser} key={props.currentUser && props.currentUser.uid}/>
	</Grid.Column>	

    <Grid.Column width={8} style={{marginTop: 15}}>
        	<Messages currentChannel={props.currentChannel} key={props.currentChannel && props.currentChannel.id} currentUser={props.currentUser}/>
	</Grid.Column>
	  
    <Grid.Column width={4} style={{marginTop: 15}}>
        	<MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel
});


export default connect(mapStateToProps)(App);
