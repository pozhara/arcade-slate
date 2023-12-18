import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function ReviewEditForm() {
  const [errors, setErrors] = useState({});
  const [reviewData, setReviewData] = useState({
    title: "",
    content: "",
    stars: "",
    genre: "",
    developed_by: "",
    level_of_difficulty: "",
    suitable_age: "",
    hours_spent: "",
    image: "",
  });
  const {
    title,
    content,
    stars,
    genre,
    developed_by,
    level_of_difficulty,
    suitable_age,
    hours_spent,
    image,
  } = reviewData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${id}/`);
        const {
          title,
          content,
          image,
          stars,
          genre,
          developed_by,
          level_of_difficulty,
          suitable_age,
          hours_spent,
          is_owner,
        } = data;

        is_owner
          ? setReviewData({
              title,
              content,
              image,
              stars,
              genre,
              developed_by,
              level_of_difficulty,
              suitable_age,
              hours_spent,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setReviewData({
        ...reviewData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("stars", stars);
    formData.append("genre", genre);
    formData.append("developed_by", developed_by);
    formData.append("level_of_difficulty", level_of_difficulty);
    formData.append("suitable_age", suitable_age);
    formData.append("hourse_spent", hours_spent);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/reviews/${id}/`, formData);
      history.push(`/reviews/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <div>
        <div>
          <label>
            <span>Title:</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
        </div>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Content:</span>
            <input
              type="text"
              name="content"
              value={content}
              onChange={handleChange}
            />
          </label>
        </div>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Stars:</span>
            <select
              name="stars"
              id="stars"
              value={stars}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
        {errors?.stars?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Genre:</span>
            <select
              name="genre"
              id="genre"
              value={genre}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Sandbox">Sandbox</option>
              <option value="Real-time strategy">Real-time strategy</option>
              <option value="Shooters">Shooters</option>
              <option value="Multiplayer online battle arena">
                Multiplayer online battle arena
              </option>
              <option value="Role-playing">Role-playing</option>
              <option value="Simulation and sports">
                Simulation and sports
              </option>
              <option value="Action adventure">Action adventure</option>
              <option value="Survival">Survival</option>
              <option value="Horror">Horror</option>
            </select>
          </label>
        </div>
        {errors?.genre?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Developed by:</span>
            <input
              type="text"
              name="developed_by"
              value={developed_by}
              onChange={handleChange}
            />
          </label>
        </div>
        {errors?.developed_by?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Difficulty:</span>
            <select
              name="level_of_difficulty"
              id="level_of_difficulty"
              value={level_of_difficulty}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Extreme">Extreme</option>
              <option value="Nightmare">Nightmare</option>
            </select>
          </label>
        </div>
        {errors?.level_of_difficulty?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>
            <span>Suitable age:</span>
            <select
              name="suitable_age"
              id="suitable_age"
              value={suitable_age}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="3">3</option>
              <option value="7">7</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="18">18</option>
            </select>
          </label>
        </div>
        {errors?.suitable_age?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <div>
          <label>Hours spent:</label>
          <input
            type="number"
            step="1"
            pattern="\d+"
            name="hours_spent"
            value={hours_spent}
            onChange={handleChange}
          />
        </div>
        {errors?.hours_spent?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </div>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        type="submit"
      >
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                className={styles.File}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ReviewEditForm;