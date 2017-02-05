import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import Store from "./stores/Store";
import Page from "./components/Page";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = new Store(this.render);
    }

    render() {
        console.log("render app");

        return (
            <Router history={browserHistory}>
                <Route path="/" component={Page} store={this.store} />
                <Route path="/category/:categoryName" component={Page} store={this.store} />
            </Router>
        );
    }
}

export default App;
