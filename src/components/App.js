import React  from 'react';
import {Grid} from 'semantic-ui-react';
import './App.css';
import {connect} from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = (props) => (
  <Grid  className="app" style={{background: "#eee"}}>

	<Grid.Column >
       	<ColorPanel />
        <SidePanel currentUser={props.currentUser} key={props.currentUser && props.currentUser.uid}/>
	</Grid.Column>	

    <Grid.Column width={8} style={{marginLeft: 320, marginTop: 15, left: 0, position: "fixed"}}>
        	<Messages currentChannel={props.currentChannel} key={props.currentChannel && props.currentChannel.id} currentUser={props.currentUser}/>
	</Grid.Column>
	  
    <Grid.Column  style={{marginTop: 15}}>
        	<MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel
});


export default connect(mapStateToProps)(App);
