import React from 'react';
import Paper from 'material-ui/Paper';

import ThreadListContainer from "./ThreadListContainer";
import ThreadContainer from "./ThreadContainer";

const styles = {
    backgroundColor: "rgb(241, 241, 241)",
    minHeight: "100%",
    position: "absolute",
    "width": "100%"
};

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.store.pull('email')
        };

        this.props.store.addStateListener(this, this.setState, "email");
    }

    render() {
        // let threads = this.props.threads.map(function(thread) {
        //   return(
        //       <p key={thread.id}>{thread.title}</p>
        //   );
        // });
        let content;

        // if path category
        if(this.props.params.categoryId){
            content = (
                <ThreadListContainer store={this.props.store} params={this.props.params} />
            )
        }

        // if path thread
        if(this.props.params.threadId){
            content = (
                <ThreadContainer store={this.props.store} params={this.props.params} />
            )
        }

        return (
            <div>
                <Paper style={{margin: 10}} zDepth={1} >
                    {content}
                </Paper>
            </div>
        );
    }
}

export default Content;
