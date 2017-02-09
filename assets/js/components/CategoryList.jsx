import React from "react";

import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import {Link} from "react-router";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import ActionInfo from "material-ui/svg-icons/action/info";

class CategoryList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};

		this.renderCategories = this.renderCategories.bind(this);
	}

	componentDidMount() {
		this.props.store.addStateListener(this, this.setState, "categories");
	}

	componentWillUnmount() {
		this.props.store.deleteStateListener(this, "categories");
	}

	renderCategories() {
		let categoryList = [];
		let subheader;
		if(this.state.categories){
			this.state.categories.forEach(function(category) {
				categoryList.push(
					<Link key={category.idcategory} to={`/category/${category.idcategory}`}>
						<ListItem
							key={category.idcategory}
							leftAvatar={< Avatar icon={< FileFolder />} />}
							rightIcon={< ActionInfo />}
							primaryText={category.label}
							secondaryText="Jan 28, 2014"/>
					</Link>
				);
			});
			if(this.props.subheader){
				subheader = (
					<div>
						<Subheader inset={true}>{this.props.subheader}</Subheader>
						<Divider inset={false}/>
					</div>
				);
			}
		}
		return (
			<List>
				{subheader}
				{categoryList}
			</List>
		);
	}

	render() {
		return (
			<div>
				{this.renderCategories()}
			</div>
		);
	}
}

export default CategoryList;
