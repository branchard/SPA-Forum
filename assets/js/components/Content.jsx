import React from 'react';
import Paper from 'material-ui/Paper';

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

        return (
            <div>
                <Paper style={{margin: 10, padding: 16}} zDepth={1} >
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <h3>{this.props.params.categoryName}</h3>
                    <h4>{this.state.email}</h4>
                </Paper>
            </div>
        );
    }
}

export default Content;
