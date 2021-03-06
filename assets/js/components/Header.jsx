import React from "react";
import AppBar from "material-ui/AppBar";

import LeftMenu from "./LeftMenu";

class Header extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<header>
				<AppBar title="React forum example" onLeftIconButtonTouchTap={() => this.refs.leftMenu.handleToogle()}/>
				<nav>
					<LeftMenu store={this.props.store} ref="leftMenu"/>
				</nav>
			</header>
		);
	}
}

export default Header;
