import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./Header";
import Content from "./Content";

const styles = {
	backgroundColor: "rgb(241, 241, 241)",
	minHeight: "100%",
	position: "absolute",
	"width": "100%"
};

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.updatingStore = this.updatingStore.bind(this);
	}

	updatingStore() {
		// if no 404
		if(this.props.routes[0].path !== "*"){
			if(this.props.params.categoryId){
				this.props.route.store.getThreads(this.props.params.categoryId);
			}else if(this.props.params.threadId){

				// prevent previous posts displaying
				this.props.route.store.push("thread", []);

				this.props.route.store.getThread(this.props.params.threadId);
			}else{
				this.props.route.store.push("currentlyViewing", "home");
			}
		}else{
			this.props.route.store.push("currentlyViewing", "404");
		}
	}

	componentDidMount() {
		this.props.route.store.getCategories();
		this.updatingStore();
	}

	componentDidUpdate() {
		this.updatingStore();
	}

	render() {
		return (
			<MuiThemeProvider>
				<div style={styles}>
					<Header store={this.props.route.store}/>
					<Content store={this.props.route.store}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Page;
