import React from "react";

import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";

class Thread extends React.Component {
	constructor(props) {
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	renderPosts() {
		let postList = [];
		if(this.props.posts){
			this.props.posts.forEach(function(post){
				let date = new Date(post.creationdate);
				console.log(date);
				postList.push(
					<ListItem
						key={post.idpost}
						leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg"/>}
						primaryText={post.message}
						secondaryText={
							`Jack le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`
						}
						disabled={true}
					/>
				);
			});
		}
		return postList;
	}

	render() {
		return (
			<div>
				<List>
					<Subheader>Titre du thread</Subheader>
					{this.renderPosts()}
				</List>
			</div>
		);
	}
}

export default Thread;
