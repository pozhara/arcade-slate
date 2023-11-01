import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";

const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    review_comments_count,
    review_likes_count,
    review_like_id,
    title,
    content,
    image,
    stars,
    genre,
    developed_by,
    level_of_difficulty,
    suitable_age,
    hours_spent,
    updated_at,
    reviewPage,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && reviewPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/reviews/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className='text-center'>{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
            {is_owner ? (
                <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                    <i className="far fa-heart"/>
                </OverlayTrigger>
            ) : review_like_id ? (
                <span>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span>
                    <i className={`far fa-heart ${styles.HeartOutline}`}/>
                </span>
            ) : (
                <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like posts!</Tooltip>}>
                    <i className="far fa-heart"/>
                </OverlayTrigger>
            )}
            {review_likes_count}
            <Link to={`reviews/${id}`}>
                <i className='far fa-comments'/>
            </Link>
            {review_comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
