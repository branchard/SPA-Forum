import React from 'react';
import AppBar from 'material-ui/AppBar';

import LeftMenu from './LeftMenu';

class Header extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <header>
                <AppBar title="React forum example" onLeftIconButtonTouchTap={() => this.refs.leftMenu.handleToogle()} />
                <LeftMenu store={this.props.store} ref="leftMenu" />
            </header>
        );
    }
}

export default Header;
