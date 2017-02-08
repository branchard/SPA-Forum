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

	render() {
		return (
			<_Toolbar>
				<ToolbarGroup firstChild={true}>
					<Link to={this.props.linkTo}>
						<FlatButton
							label={this.props.linkTitle || "Retour"}
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
					<ToolbarTitle text={this.props.title}/>
				</ToolbarGroup>
			</_Toolbar>
		);
	}
}

export default Toolbar;
