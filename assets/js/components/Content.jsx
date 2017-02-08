import React from "react";
import Paper from "material-ui/Paper";

import Toolbar from "./Toolbar";
import ThreadList from "./ThreadList";
import Thread from "./Thread";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}

	componentDidMount() {
		this.props.store.addStateListener(this, this.setState, "threads");
		this.props.store.addStateListener(this, this.setState, "thread");
		this.props.store.addStateListener(this, this.setState, "currentlyViewing");
	}

	componentWillUnmount() {
		this.props.store.deleteStateListener(this, "threads");
		this.props.store.deleteStateListener(this, "thread");
		this.props.store.addStateListener(this, this.setState, "currentlyViewing");
	}

	render() {
		let that = this;

		let content;
		let title;
		let linkTitle;
		let linkTo;

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

		return (
			<div>
				<Paper
					style={{margin: 10}}
					zDepth={1}
				>
					<Toolbar store={this.props.store} linkTo={linkTo} linkTitle={linkTitle} title={title}/>
					{content}
				</Paper>
			</div>
		);
	}
}

export default Content;
