import React from "react";
import styles from "../../styles/Post.module.css";
import homeStyles from '../../styles/HomePage.module.css';
import navStyles from '../../styles/NavBar.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Review = ({review}) => {
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
    setReviews
  } = review;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try{
      const {data} = await axiosRes.post('/likes/', {review:id})
      setReviews((prevReviews)=>({
        ...prevReviews,
        results: prevReviews.results.map((review)=>{
          return review.id === id
          ? {...review, review_likes_count: review.review_likes_count + 1, review_like_id: data.id}
          : review
        })
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnlike = async () => {
    try{
      await axiosRes.delete('/likes/', {review:id})
      setReviews((prevReviews)=>({
        ...prevReviews,
        results: prevReviews.results.map((review)=>{
          return review.id === id
          ? {...review, review_likes_count: review.review_likes_count - 1, review_like_id: null}
          : review
        })
      }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={navStyles.NavLink}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className='text-white'>{updated_at}</span>
            {is_owner && reviewPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/reviews/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className='text-center text-white'>{title}</Card.Title>}
        {content && <Card.Text className='text-white'>{content}</Card.Text>}
        {stars && <Card.Text className='text-white'>Stars: {stars}<i className={`fa-solid fa-star ${homeStyles.YellowText}`}></i></Card.Text>}
        {genre && <Card.Text className='text-white'>Genre: {genre}</Card.Text>}
        {developed_by && <Card.Text className='text-white'>Developed by: {developed_by}</Card.Text>}
        {level_of_difficulty && <Card.Text className='text-white'>Difficulty level: {level_of_difficulty}</Card.Text>}
        {suitable_age && <Card.Text className='text-white'>Suitable age: {suitable_age}</Card.Text>}
        {hours_spent && <Card.Text className='text-white'>Hours spent: {hours_spent}</Card.Text>}
        <div className={styles.PostBar}>
            {is_owner ? (
                <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                    <i className="far fa-heart"/>
                </OverlayTrigger>
            ) : review_like_id ? (
                <span onClick={handleUnlike}>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span onClick={handleLike}>
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