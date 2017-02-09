import React from "react";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleInputValue: "",
			messageInputValue: "",
			inputsValides: false
		};

		// this.handleOpenThreadDialog = this.handleOpenThreadDialog.bind(this);
		// this.handleClodeThreadDialog = this.handleClodeThreadDialog.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
		this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
		this.handleOnInputChange = this.handleOnInputChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleSendThread = this.handleSendThread.bind(this);
	}

	handleKeyPress(event){
		if(event.key === "Enter"){
			//this.handleSendPost();
			if(this.state.inputsValides){
				this.handleSendThread();
			}
			event.preventDefault();
		}
	}

	handleTitleInputChange(event){
		this.setState({titleInputValue: event.target.value});
	}

	handleMessageInputChange(event){
		this.setState({messageInputValue: event.target.value});
	}

	handleOnInputChange(nextState){
		nextState.inputsValides = nextState.titleInputValue != "" && nextState.messageInputValue != "";
	}

	// send un new thread
	handleSendThread(){
		this.props.store.sendThread(this.props.categoryId, this.state.titleInputValue, this.state.messageInputValue);
		this.closeModal();
		this.setState({
			titleInputValue: "",
			messageInputValue: "",
			inputsValides: false
		});
	}

	closeModal(){
		this.props.onClose();
	}

	componentWillUpdate(nextProps, nextState){
		this.handleOnInputChange(nextState);
	}

	render() {
		return (
			<div>
				<Dialog
					title="Creation d'une nouvelle discussion"
					actions={[
						<FlatButton
							label="Annuler"
							primary={true}
							onTouchTap={this.props.onClose}
						/>,
						<FlatButton
							label="Valider"
							primary={true}
							disabled={!this.state.inputsValides}
							onTouchTap={this.handleSendThread}
						/>,
					]}
					modal={false}
					open={this.props.open}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
					bodyStyle={{
						padding: "0 24px"
					}}
				>
					<form>
						<TextField
							floatingLabelText="Titre"
							value={this.state.titleInputValue}
							type="text"
							fullWidth={true}
							onChange={this.handleTitleInputChange}
							onKeyPress={this.handleKeyPress}
							/>
						<TextField
							floatingLabelText="Message"
							value={this.state.messageInputValue}
							type="text"
							multiLine={true}
							rows={2}
							rowsMax={4}
							fullWidth={true}
							style={{marginBottom: "32px"}}
							onChange={this.handleMessageInputChange}
							onKeyPress={this.handleKeyPress}
						/>
					</form>
				</Dialog>
			</div>
		);
	}
}

export default Content;
