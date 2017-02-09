import React from "react";

import {List, ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";

import PostEditor from "./PostEditor";

class Thread extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentDidMount() {
		this.props.store.addStateListener(this, this.setState, "isLogged");
	}

	componentWillUnmount() {
		this.props.store.deleteStateListener(this, "isLogged");
	}

	renderPosts() {
		let postList = [];
		if(this.props.thread.posts){
			this.props.thread.posts.forEach(function(post){
				let date = new Date(post.creationdate);
				postList.push(
					<ListItem
						key={post.idpost}
						leftAvatar={<Avatar src={post.user.photo}/>}
						primaryText={post.message}
						secondaryText={
							`${post.user.username} le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`
						}
						disabled={true}
					/>
				);
			});
		}
		return postList;
	}

	render() {
		let postEditor;
		if(this.state.isLogged){
			postEditor = (
				<PostEditor threadId={this.props.thread.idthread} store={this.props.store} />
			);
		}

		return (
			<div>
				<List>
					{this.renderPosts()}
				</List>
				{postEditor}
			</div>
		);
	}
}

export default Thread;
