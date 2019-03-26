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

	<Grid.Column>
       	<ColorPanel />
        <SidePanel currentUser={props.currentUser}/>
	</Grid.Column>	

    <Grid.Column style={{marginLeft: 320, marginTop: 15}}>
        	<Messages />
	</Grid.Column>
	  
    <Grid.Column width={4} style={{marginTop: 15}}>
        	<MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateFromProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStateFromProps)(App);
