import React from "react";
import {Card, CardHeader, CardTitle} from "material-ui/Card";
import {grey50} from "material-ui/styles/colors";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
	text: {
		color: grey50
	},
	border: {
		borderColor: grey50
	}
};

class LeftMenuCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: this.props.store.pull("isLogged"),
			usernameInputValue: "",
			passwordInputValue: ""
		};

		this.props.store.addStateListener(this, this.setState, "isLogged");
		this.props.store.addStateListener(this, this.setState, "username");
		this.props.store.addStateListener(this, this.setState, "email");
		this.props.store.addStateListener(this, this.setState, "photo");

		this.handleConnection = this.handleConnection.bind(this);
		this.handleDeconnection = this.handleDeconnection.bind(this);
		this.renderConnectionForm = this.renderConnectionForm.bind(this);
		this.renderCardHeader = this.renderCardHeader.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleConnection() {
		//this.props.store.push("test", "toto");
		this.props.store.connectClient(this.state.usernameInputValue, this.state.passwordInputValue);
	}

	handleDeconnection() {
		this.props.store.deconnectClient();
	}

	handleUsernameChange(event) {
		this.setState({usernameInputValue: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({passwordInputValue: event.target.value});
	}

	renderConnectionForm() {
		console.log("left menu card render/ is logged: " + this.state.isLogged);
		return (
			<div>
				<CardTitle style={{
					paddingBottom: "0"
				}} subtitleStyle={{
					fontSize: "16px"
				}} subtitle="Veuillez vous connecter" subtitleColor={grey50}/>
				<form style={{
					padding: "0 16px 16px 16px"
				}}>
					<TextField
						floatingLabelText="Pseudo"
						type="text"
						floatingLabelStyle={styles.text}
						floatingLabelFocusStyle={styles.text}
						underlineFocusStyle={styles.border}
						underlineStyle={styles.border}
						inputStyle={styles.text}
						fullWidth={true}
						value={this.state.usernameInputValue}
						onChange={this.handleUsernameChange}
						onKeyPress={(e) => {e.key === "Enter" ? this.handleConnection() : null;}}
						/>
					<TextField
						floatingLabelText="Mot de passe"
						type="password"
						floatingLabelStyle={styles.text}
						floatingLabelFocusStyle={styles.text}
						underlineFocusStyle={styles.border}
						underlineStyle={styles.border}
						inputStyle={styles.text}
						fullWidth={true} style={{marginBottom: "32px"}}
						value={this.state.passwordInputValue}
						onChange={this.handlePasswordChange}
						onKeyPress={(e) => {e.key === "Enter" ? this.handleConnection() : null;}}
					/>
					<RaisedButton onTouchTap={this.handleConnection} label="Valider" fullWidth={true}/>
				</form>
			</div>
		);
	}

	// if logged
	renderCardHeader() {
		return (
			<div>
				<CardHeader
					title={this.state.username}
					titleColor={grey50}
					subtitle={this.state.email}
					subtitleColor={grey50}
					avatar={this.state.photo}
				/>
				<div className="logout-button">
					<RaisedButton
						onTouchTap={this.handleDeconnection}
						label="Déconnexion"
						fullWidth={true}
					/>
				</div>
			</div>
		);
	}

	render() {
		let cardContent = null;
		if (this.state.isLogged) {
			cardContent = this.renderCardHeader();
		} else {
			cardContent = this.renderConnectionForm();
		}
		return (
			<div>
				<Card style={{
					boxShadow: "none",
					backgroundColor: "#00ACC1",
					borderRadius: "0"
				}}>
					{cardContent}
				</Card>
			</div>
		);
	}
}

export default LeftMenuCard;
