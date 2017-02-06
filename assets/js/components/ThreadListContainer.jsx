import React from 'react';

import ThreadList from './ThreadList';

class ThreadListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: []
        };
    }

    componentDidMount(){
        this.props.store.addStateListener(this, this.setState, "threads");
        this.props.store.getThreads(this.props.params.categoryId);
    }

    componentWillUnmount(){
        this.props.store.deleteStateListener(this, "threads");
    }

    componentWillReceiveProps(nextProps) {
        this.props.store.getThreads(nextProps.params.categoryId);
    }

    render() {
        // {...this.props} pass this.props to child
        return (
            <div>
                <ThreadList {...this.props} threads={this.state.threads} />
            </div>
        );
    }
}

export default ThreadListContainer;
