import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Edit from './components/Edit';
import Create from './components/Create';

const client = new ApolloClient({ uri: 'http://localhost:4000' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/edit/:id' component={Edit} />
                <Route path='/create' component={Create} />
            </div>
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
);
