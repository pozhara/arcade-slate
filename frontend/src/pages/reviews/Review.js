import React from "react";
import styles from "../../styles/Post.module.css";
import homeStyles from "../../styles/HomePage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Review = ({ review, setReviews }) => {
  const {
    id = 0,
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
    updated_at
  } = review;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/reviews/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      if (review_like_id) {
        await axiosRes.post(`/reviews/${id}/unlike`);
      } else {
        await axiosRes.post(`/reviews/${id}/like`);
      }
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((r) =>
          r.id === id
            ? {
                ...r,
                review_likes_count: review_like_id
                  ? r.review_likes_count - 1
                  : r.review_likes_count + 1,
                review_like_id: review_like_id ? null : 1,
              }
            : r
        ),
      }));
    } catch (err) {
      console.log(err);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((r) =>
          r.id === id
            ? {
                ...r,
                review_likes_count: review_like_id
                  ? r.review_likes_count + 1
                  : r.review_likes_count - 1,
                review_like_id: review_like_id ? 1 : null,
              }
            : r
        ),
      }));
    }
  };

  const renderLikeButton = () => {
    if (is_owner) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can't like your own post!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      );
    } else if (currentUser) {
      return (
        (review_like_id)?
        <span onClick={handleLike}>
        <i className={`fas fa-heart ${styles.Heart}`} />
      </span>
      :
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </span>
      );
    } else {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      );
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
          </Link>
          <div className="align-items-center justify-content-between">
            {title && (
              <Card.Title className={styles.PostTitle}>{title}</Card.Title>
            )}
          </div>
          <div className="d-flex align-items-center">
            <span className={styles.PostDate}>{updated_at}</span>
            {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
          </div>
        </Media>
      </Card.Body>

      <Card.Body>
        <div className={styles.PostContainer}>
          {image && (
            <div className={styles.ImageContainer}>
              <Link to={`/reviews/${id}`}>
                <Card.Img src={image} alt={title} className={styles.PostImage} />
              </Link>
            </div>
          )}
          <div className={styles.ContentContainer}>
            {content && (
              <Card.Text className={styles.PostContent}>
                {"~ "}
                {content}
              </Card.Text>
            )}
            {stars && (
              <Card.Text className={styles.PostContent}>
                Stars: {stars}
                <i className={`fa-solid fa-star small ${homeStyles.YellowText}`}></i>
              </Card.Text>
            )}
            {genre && (
              <Card.Text className={styles.PostContent}>Genre: {genre}</Card.Text>
            )}
            {developed_by && (
              <Card.Text className={styles.PostContent}>
                Developed by: {developed_by}
              </Card.Text>
            )}
            {level_of_difficulty && (
              <Card.Text className={styles.PostContent}>
                Difficulty level: {level_of_difficulty}
              </Card.Text>
            )}
            {suitable_age && (
              <Card.Text className={styles.PostContent}>
                Suitable age: {suitable_age}
              </Card.Text>
            )}
            {hours_spent && (
              <Card.Text className={styles.PostContent}>
                Hours spent: {hours_spent}
              </Card.Text>
            )}
          </div>
        </div>
        <div>
          <div>
            {renderLikeButton()}
            <span className={styles.LikeCount}>{review_likes_count}</span>
          </div>

          <div>
            <Link to={`reviews/${id}`} className={styles.CommentIcon}>
              <i className="far fa-comments" />
            </Link>
            <span className={styles.CommentCount}>{review_comments_count}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
