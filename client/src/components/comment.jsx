import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      displayReviews: false,
      reviews: [],
      likes: 0,
      userLikes: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.toggleReviews = this.toggleReviews.bind(this);
    this.getReviews();

    $.get({
      url: '/comments',
      data: { post: this.props.post },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ comments: data.rows });
    });
    $.get({
      url: '/likes',
      data: { post: this.props.post, user: this.props.currentUser },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ likes: data.count, userLikes: data.usersLike });
    });
  }

  getReviews() {
    $.get({
      url: '/reviews',
      data: { post: this.props.post, dish: this.props.dishid },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ reviews: data });
    });
  }

  handleLike() {
    const newOpinion = !this.state.userLikes;
    $.post({
      url: '/likes',
      data: JSON.stringify({
        likes: newOpinion,
        post: this.props.post,
        user: this.props.currentUser,
      }),
      contentType: 'application/json',
    });

    if (this.state.userLikes) {
      this.setState({ likes: this.state.likes - 1 });
    } else {
      this.setState({ likes: this.state.likes + 1 });
    }

    this.setState({ userLikes: !this.state.userLikes });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }
  toggleReviews() {
    this.setState({ displayReviews: !this.state.displayReviews });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      const content = event.target.value;
      $.post({
        url: '/comments',
        contentType: 'application/json',
        data: JSON.stringify({
          comment: content,
          userId: this.props.currentUser,
          postId: this.props.post,
        }),
      }).done(() => {
        this.setState({ comment: '' });
        $.get({
          url: '/comments',
          data: { post: this.props.post },
          contentType: 'application/json',
        }).done((data) => {
          this.setState({ comments: data.rows });
        });
      });
    }
  }

  render() {
    const comments = this.state.comments.map(comment => (
      <li
        className="comment"
        key={comment.id}
      >
        <span className="username">{comment.username}:</span>
        {comment.content}
      </li>));
    const reviews = this.state.reviews.map(review => (
      <li className="review" key={review.id}>
        <span className="username">{review.username}:</span> {review.content}
      </li>));
    const {
      currentUser,
      restaurantid,
      dishid,
      likesdish,
      handleClick,
      votes,
      upvoteUsers,
      downvoteUsers,
    } = this.props;
    const { upvote, downvote } = votes;
    return (
      <div className="comments">
        <div className="row">
          <div className="col-2">
            <button
              onClick={this.handleLike}
              type="button"
              title="Like this post"
              className="btn btn-outline-secondary likes-button"
            >
              <i className={`material-icons ${this.state.userLikes}`}>favorite_border</i>
              <span className="counter">{this.state.likes}</span>
            </button>
          </div>
          <div className="col-2">
            {(this.state.comments.length > 0) &&
              <button
                type="button"
                name="comments"
                onClick={this.toggleReviews}
                className={this.state.displayReviews ? 'btn btn-outline-secondary' : 'btn btn-outline-secondary red'}
                title={`${this.state.comments.length} comments`}
              >
                <i className="material-icons">message</i>
                <span className="counter">{this.state.comments.length}</span>
              </button>}
          </div>
          <div className="col-2">
          </div>
          <div className="col-2">
            {(this.state.reviews.length > 0) &&
            <button
              type="button"
              name="reviews"
              onClick={this.toggleReviews}
              title={`See what ${this.state.reviews.length} others said about this dish`}
              className={this.state.displayReviews ? 'btn btn-outline-secondary red' : 'btn btn-outline-secondary'}
            >
              <i className="material-icons">star_rate</i>
              <span className="counter">{this.state.reviews.length}</span>
            </button>}
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-secondary"
              title="I like this dish."
              type="button"
              onClick={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              onKeyDown={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              id={upvoteUsers.includes(currentUser) ?
                'likes-selected' : null}
            >
              <i role="presentation" className="material-icons col-2">
          insert_emoticon
              </i>
              <span className="counter">{upvote}</span>
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
              onKeyUp={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
              id={downvoteUsers.includes(currentUser) ?
                'dislikes-selected' : null}
              className="btn btn-outline-secondary"
              title="I don't this dish."
              type="button"
            >
              <i role="presentation" className="material-icons col-2">
              mood_bad
              </i>
              <span className="counter">{downvote}</span>
            </button>
          </div>
        </div>
        { !this.state.displayReviews && <ul>{comments}</ul>}
        { this.state.displayReviews && <ul>{reviews}</ul>}
        <textarea
          placeholder="Leave a comment..."
          className="leaveComment form-control"
          value={this.state.comment}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
      </div>);
  }
}

export default Comment;
