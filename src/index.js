import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Components 
import App from './components/App';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';


const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
