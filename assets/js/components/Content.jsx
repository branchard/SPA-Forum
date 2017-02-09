import React from "react";

import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import Toolbar from "./Toolbar";
import CategoryList from "./CategoryList";
import ThreadList from "./ThreadList";
import Thread from "./Thread";
import NewThreadModal from "./NewThreadModal";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newThreadDialogOpen: false
		};

		this.handleOpenThreadDialog = this.handleOpenThreadDialog.bind(this);
		this.handleCloseThreadDialog = this.handleCloseThreadDialog.bind(this);
	}

	componentDidMount() {
		this.props.store.addStateListener(this, this.setState, "threads");
		this.props.store.addStateListener(this, this.setState, "thread");
		this.props.store.addStateListener(this, this.setState, "isLogged");
		this.props.store.addStateListener(this, this.setState, "username");
		this.props.store.addStateListener(this, this.setState, "currentlyViewing");
	}

	componentWillUnmount() {
		this.props.store.deleteStateListener(this, "threads");
		this.props.store.deleteStateListener(this, "thread");
		this.props.store.deleteStateListener(this, this.setState, "isLogged");
		this.props.store.deleteStateListener(this, this.setState, "username");
		this.props.store.addStateListener(this, this.setState, "currentlyViewing");
	}

	handleOpenThreadDialog() {
		this.setState({
			newThreadDialogOpen: true
		});
	}

	handleCloseThreadDialog() {
		this.setState({
			newThreadDialogOpen: false
		});
	}

	render() {
		let that = this;

		let content;
		let title;
		let linkTitle;
		let linkTo;
		let rightMenu;

		if (this.state.threads && this.state.currentlyViewing === "threads") {
			content = (<ThreadList threads={this.state.threads}/>);
			linkTitle = "Accueil";
			if(this.state.threads.length !== 0){ // TODO
				this.props.store.pull("categories").forEach(function(category){
					if(category.idcategory === that.state.threads[0].idcategory){
						title = category.label;
						return;
					}
				});
			}
			linkTo = "/";

			if(this.state.isLogged){
				rightMenu = (
					<IconButton
						tooltip="Créer une discussion"
						onTouchTap={this.handleOpenThreadDialog}
					>
						<NewThreadModal
							store={this.props.store}
							open={this.state.newThreadDialogOpen}
							onClose={this.handleCloseThreadDialog}
							categoryId={that.state.threads[0].idcategory} // TODO: if no threads
						/>
						<AddIcon color="rgba(0, 0, 0, 0.4)" />
					</IconButton>
				);
			}
		}

		if (this.state.thread && this.state.currentlyViewing === "thread") {
			content = (<Thread thread={this.state.thread} store={this.props.store}/>);
			title = this.state.thread.title;
			this.props.store.pull("categories").forEach(function(category){
				if(category.idcategory === that.state.thread.idcategory){
					linkTitle = category.label;
					return;
				}
			});
			linkTo = `/category/${this.state.thread.idcategory}`;
		}

		if(this.state.currentlyViewing === "home"){
			content = (<CategoryList store={this.props.store}/>);
			title = "Liste des categories";
		}

		if(this.state.currentlyViewing === "404"){
			content = (
				<h3
					style={{color: "rgba(0, 0, 0, 0.4)", margin: "0", padding: "40px", textAlign: "center"}}
				>
					La page n'existe pas !
				</h3>
			);
			title = "404";
		}


		return (
			<div>
				<Paper style={{margin: 10}} zDepth={1} >
					<Toolbar
						store={this.props.store}
						linkTo={linkTo}
						linkTitle={linkTitle}
						title={title}
						rightMenu={rightMenu}
					/>
					{content}
				</Paper>
			</div>
		);
	}
}

export default Content;
