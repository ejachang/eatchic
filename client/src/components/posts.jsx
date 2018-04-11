import React from 'react';
import $ from 'jquery';

import Post from './post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      posts: this.props.posts,
      id: this.props.id,
    };

    this.handleClick = this.handleClick.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts,
        user: nextProps.user,
        id: nextProps.id,
      });
    }
  }

  postUpvote(query) {
    $.post({
      contentType: 'application/json',
      url: '/votes/upvote',
      data: JSON.stringify(query),
      success: () => {
        this.props.changeView();
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  postDownvote(query) {
    $.post({
      contentType: 'application/json',
      url: '/votes/downvote',
      data: JSON.stringify(query),
      success: () => {
        this.props.changeView();
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  handleClick(query, vote) {
    if (vote) {
      query.likesdish = 1;
      query.userid = this.state.id;
      this.postUpvote(query);
    } else {
      query.likesdish = 0;
      query.userid = this.state.id;
      this.postDownvote(query);
    }
  }


  render() {
    return (
      <div>
        { this.state.posts.map(post =>
          (<Post
            key={post.postid}
            user={this.state.user}
            post={post}
            handleClick={this.handleClick}
            id={this.state.id}
            currentUser={this.props.currentUser}
          />))}
      </div>
    );
  }
}

export default Posts;
