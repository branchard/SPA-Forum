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
	}

	render() {
		return (
			<MuiThemeProvider>
				<div style={styles}>
					<Header store={this.props.route.store}/>
					<Content params={this.props.params} store={this.props.route.store}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Page;
