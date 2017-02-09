import React from "react";

import TextField from "material-ui/TextField";

class PostEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageInputValue: ""
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSendPost = this.handleSendPost.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleKeyPress(event){
		if(event.key === "Enter"){
			this.handleSendPost();
			this.setState({
				messageInputValue: ""
			});
			event.preventDefault();
		}
	}

	handleSendPost() {
		this.props.store.sendPost(this.props.threadId, this.state.messageInputValue);
	}

	handleInputChange(event) {
		this.setState({messageInputValue: event.target.value});
	}

	render() {
		return (
			<div style={{padding: "8px 16px"}}>
				<TextField
					floatingLabelText="Écrire une réponse ..."
					value={this.state.messageInputValue}
					multiLine={true}
					rows={2}
					rowsMax={4}
					fullWidth={true}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
				/>
			</div>
		);
	}
}

export default PostEditor;
