import React from "react";
import styles from "../../styles/Post.module.css";
import homeStyles from '../../styles/HomePage.module.css'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Deal = ({ deal }) => {

  const {
    id = 0,
    profile_id,
    profile_image,
    title,
    content,
    image,
    category,
    updated_at,
  } = deal;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === deal.owner;
  const history = useHistory()

  const handleEdit = () => {
    history.push(`/deals/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/deals/${id}/`);
      history.push('/deals');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {/* <span className={styles.Username}>{owner}</span> */}
          </Link>
          <div className="align-items-center justify-content-between">
            {title && (
              <Card.Title className={styles.PostTitle}>{title}</Card.Title>
            )}
          </div>
          <div className="d-flex align-items-center">
            <span className={styles.PostDate}>{updated_at}</span>
            {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}
          </div>
        </Media>
      </Card.Body>

      <Card.Body>
        <div className={styles.PostContainer}>
          {image && (
            <div className={styles.ImageContainer}>
              <Link to={`/deals/${id}`}>
                <Card.Img
                  src={image}
                  alt={title}
                  className={styles.PostImage}
                />
              </Link>
            </div>
          )}
          <div className={styles.ContentContainer}>
            {content && (
              <Card.Text className={styles.PostContent}>
                {content}
              </Card.Text>
            )}
            {category && (
              <Card.Text className={styles.PostContent}>
                Category: {category}
              </Card.Text>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Deal;
