import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Loaders from './components/plugins/Loaders';
import Footer from './components/plugins/Footer';
import HomeComponent from './components/HomeComponent';

class App extends Component {

    render () {
        return (
            <div className="app">
                <Loaders />
                <div class="header"/>
                <Route path='/' exact component={HomeComponent} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);