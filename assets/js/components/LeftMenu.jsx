import React from "react";
import Drawer from "material-ui/Drawer";

import LeftMenuCard from "./LeftMenuCard";
import CategoryList from "./CategoryList";

class LeftMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};

		this.handleToogle = this.handleToogle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
	}

	componentWillUnmount() {

	}

	handleToogle() {
		this.setState({
			open: !this.state.open
		});
	}

	handleClose() {
		this.setState({open: false});
	}

	render() {
		return (
			<div>
				<Drawer
					containerStyle={{overflow: "hidden"}}
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
				>
					<LeftMenuCard store={this.props.store}/>
					<CategoryList store={this.props.store}/>
				</Drawer>
			</div>
		);
	}
}

export default LeftMenu;
