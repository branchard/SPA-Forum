import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { Link } from 'react-router'

import LeftMenuCard from './LeftMenuCard';

class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handleToogle = this.handleToogle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToogle() {
        this.setState({
            open: !this.state.open
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }


    render() {
        return (
            <div>
                <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})} >
                    <LeftMenuCard store={this.props.store} />
                    <List>
                      <Subheader inset={true}>Catégories</Subheader>
                      <Divider inset={false} />
                      <Link to={`/category/${Math.floor(Math.random() * 10)}`}>
                          <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText="Categorie 1"
                            secondaryText="Jan 9, 2014"
                          />
                      </Link>
                      <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} />}
                        primaryText="Categorie 2"
                        secondaryText="Jan 17, 2014"
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                              key={1}
                              leftAvatar={<Avatar icon={<FileFolder />} />}
                              rightIcon={<ActionInfo />}
                              primaryText="Sous ategorie 1"
                              secondaryText="Jan 28, 2014"
                          />
                          ]}
                      />
                      <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} />}
                        rightIcon={<ActionInfo />}
                        primaryText="Categorie 3"
                        secondaryText="Jan 28, 2014"
                      />
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default LeftMenu;
