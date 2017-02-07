import React from "react";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import ActionInfo from "material-ui/svg-icons/action/info";
import {Link} from "react-router";

import LeftMenuCard from "./LeftMenuCard";

class LeftMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};

		this.props.store.addStateListener(this, this.setState, "categories");

		this.props.store.getCategories();

		this.handleToogle = this.handleToogle.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
	}

	handleToogle() {
		this.setState({
			open: !this.state.open
		});
	}

	handleClose() {
		this.setState({open: false});
	}

	renderCategories() {
		let categoryList = [];
		this.state.categories.forEach(function(category) {
			categoryList.push(
				<Link key={category.idcategory} to={`/category/${category.idcategory}`}>
					<ListItem key={category.idcategory} leftAvatar={< Avatar icon = { < FileFolder />
					} />} rightIcon={< ActionInfo />} primaryText={category.label} secondaryText="Jan 28, 2014"/>
				</Link>
			);
		});
		return (
			<List>
				<Subheader inset={true}>Catégories</Subheader>
				<Divider inset={false}/> {categoryList}
			</List>
		);
	}

	render() {
		let categoryList;
		if (this.state.categories) {
			categoryList = this.renderCategories();
		}

		return (
			<div>
				<Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
					<LeftMenuCard store={this.props.store}/> {categoryList}
				</Drawer>
			</div>
		);
	}
}

export default LeftMenu;
