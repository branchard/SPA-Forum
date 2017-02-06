import React from 'react';

import Thread from './Thread';

class ThreadContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };

    }

    componentDidMount(){
        this.props.store.addStateListener(this, this.setState, "posts");
        this.props.store.getPosts(this.props.params.threadId);
    }

    componentWillUnmount(){
        this.props.store.deleteStateListener(this, "posts");
    }

    componentWillReceiveProps(nextProps) {
        this.props.store.getPosts(nextProps.params.threadId);
    }

    render() {
        return (
            <Thread {...this.props} posts={this.state.posts} />
        );
    }
}

export default ThreadContainer;
