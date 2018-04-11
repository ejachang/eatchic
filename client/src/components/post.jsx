import React from 'react';
import Comment from './comment';

const Post = (props) => {
  const {
    handleClick,
    post,
    user,
    id,
  } = props;
  const {
    postid,
    content,
    likesdish,
    dishname,
    dishid,
    image,
    recipe,
    restaurantid,
    restaurantname,
    userid,
    username,
    upvoteUsers,
    downvoteUsers,
    votes,
  } = post;

  return (
    <div className="post-ele">
      <article className="ele">
        <p><b>{username}</b>
          {(recipe && recipe.length > 0) ? ' cooked ' : null }
          {!(recipe && recipe.length > 0) && likesdish === 1 ? ' likes the ' : null }
          {!(recipe && recipe.length > 0) && likesdish === 0 ? ' did not like the ' : null}
          {!(recipe && recipe.length > 0) && likesdish === null ? ' ate the ' : null}
          <b><a href={recipe}>{dishname}</a></b>
          {!(recipe && recipe.length > 0) && (restaurantname && restaurantname.length > 0) ? ' from ' : null }
          {!(recipe && recipe.length > 0) && (restaurantname && restaurantname.length > 0) ? <b>{restaurantname}</b>
 : null }
        </p>
        <p className="content-ele">{content}</p>
        {image && <img className="image" alt="post" src={`/images/${image}`} />}
      </article>
      <Comment
        upvoteUsers={upvoteUsers}
        downvoteUsers={downvoteUsers}
        restaurantid={restaurantid}
        dishid={dishid}
        likesdish={likesdish}
        post={postid}
        currentUser={id}
        votes={votes}
        handleClick={handleClick}
      />
    </div>
  );
// }
};

export default Post;
