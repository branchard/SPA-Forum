import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class Thread extends React.Component {
    constructor(props) {
        super(props);

        this.renderPosts = this.renderPosts.bind(this);
    }

    renderPosts() {
        let postList = [];
        if(this.props.posts){
            this.props.posts.forEach(function(post){
                let date = new Date(post.creationdate);
                console.log(date);
                postList.push(
                    <ListItem
                        key={post.idpost}
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg"/>}
                        primaryText={post.message}
                        secondaryText={`Jack le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}h${date.getMinutes()}`}
                        disabled={true}
                    />
                )
            })
        }
        return postList;
    }

    render() {
        return (
            <List>
                <Subheader>Titre du thread</Subheader>
                <ListItem
                    leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                    primaryText=

                          "ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                          ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?"


                    secondaryText={"Jack le 15/04/2013 à 09h11"}
                    disabled={true}
                />
                {this.renderPosts()}
            </List>
        );
    }
}

export default Thread;
