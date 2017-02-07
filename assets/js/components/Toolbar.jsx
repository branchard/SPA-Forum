import React from "react";

import {Toolbar as _Toolbar} from "material-ui/Toolbar";
import {ToolbarGroup, ToolbarTitle} from "material-ui/Toolbar";
import FlatButton from "material-ui/FlatButton";
import ChevronLeft from "material-ui/svg-icons/navigation/chevron-left";
import {Link} from "react-router";

class Toolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.store.addStateListener(this, this.setState, "selectedThread");
	}

	componentWillUnmount() {
		this.props.store.deleteStateListener(this, "selectedThread");
	}

	render() {
		let title;

		if (this.state.selectedThread) {
			if (this.state.selectedThread.title) {
				title = this.state.selectedThread.title;
			}
		}

		return (
			<_Toolbar>
				<ToolbarGroup firstChild={true}>
					<Link to={"/category/1"}>
						<FlatButton
							label="Retour à la catégorie"
							icon={< ChevronLeft />}
							style={{
								top: "-1px",
								color: "rgba(0, 0, 0, 0.4)",
								margin: "10px 10px"
							}}
							labelStyle={{
								textTransform: "none",
								fontSize: "20px",
								fontWeight: "400"
							}}
						/>
					</Link>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarTitle text={title}/>
				</ToolbarGroup>
			</_Toolbar>
		);
	}
}

export default Toolbar;
