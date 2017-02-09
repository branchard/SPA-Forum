import React from "react";
import {Router, Route, browserHistory} from "react-router";

import Store from "./stores/Store";
import Page from "./components/Page";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.store = new Store();
	}

	componentDidMount(){
		this.store.handleCookiesConnection();
	}

	render() {
		console.log("render app");
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Page} store={this.store}/>
				<Route path="/category/:categoryId" component={Page} store={this.store}/>
				<Route path="/thread/:threadId" component={Page} store={this.store}/>

				{/* Client 404 */}
				<Route path="*" component={Page} store={this.store} />
			</Router>
		);
	}
}

export default App;
