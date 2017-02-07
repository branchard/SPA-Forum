import React from "react";
import Paper from "material-ui/Paper";

import Toolbar from "./Toolbar";
import ThreadListContainer from "./ThreadListContainer";
import ThreadContainer from "./ThreadContainer";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}

	render() {
		// let threads = this.props.threads.map(function(thread) {
		//   return(
		//       <p key={thread.id}>{thread.title}</p>
		//   );
		// });
		let content;

		// if path category
		if (this.props.params.categoryId) {
			content = (<ThreadListContainer store={this.props.store} params={this.props.params}/>);
		}

		// if path thread
		if (this.props.params.threadId) {
			content = (<ThreadContainer store={this.props.store} params={this.props.params}/>);
		}

		return (
			<div>
				<Paper style={{
					margin: 10
				}} zDepth={1}>
					<Toolbar store={this.props.store} title={"ah"}/> {content}
				</Paper>
			</div>
		);
	}
}

export default Content;
