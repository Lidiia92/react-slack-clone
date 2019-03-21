import React  from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = () => (
  <Grid columns='equal' className="app" style={{background: "#eee"}}>

	<Grid.Column>
       	<ColorPanel />
        <SidePanel />
	</Grid.Column>	

    <Grid.Column style={{marginLeft: 320, marginTop: 15}}>
        	<Messages />
	</Grid.Column>
	  
    <Grid.Column width={4} style={{marginTop: 15}}>
        	<MetaPanel />
    </Grid.Column>
  </Grid>
);


export default App;
