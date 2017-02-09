import React from "react";

import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import {Link} from "react-router";

class ThreadList extends React.Component {
	constructor(props) {
		super(props);

		this.renderThreads = this.renderThreads.bind(this);
	}

	renderThreads() {
		let threadList = [];
		if (this.props.threads && this.props.threads.length !== 0) {
			this.props.threads.forEach(function(thread) {
				threadList.push(
					<Link key={thread.idthread} to={`/thread/${thread.idthread}`}>
						<ListItem
							key={thread.idthread}
							primaryText={thread.title}
							secondaryText="Dernier message: 15/04/2013"
							leftIcon={< CommunicationChatBubble />}
							// rightIcon={< CommunicationChatBubble />
						/>
					</Link>
				);
			});
		}else{
			threadList.push(
				<ListItem
					key={1}
					primaryText="Il n'y a pas de discussions à afficher."
					secondaryText=":/"
				/>
			);
		}
		return threadList;
	}

	render() {
		return (
			<div>
				<List>
					{this.renderThreads()}
				</List>
			</div>
		);
	}
}

export default ThreadList;
