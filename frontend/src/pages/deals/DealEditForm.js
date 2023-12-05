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
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function DealEditForm() {
  const [errors, setErrors] = useState({});
  const [dealData, setDealData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const {
    title,
    content,
    category,
    image,
  } = dealData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/deals/${id}/`);
        const {
          title,
          content,
          category,
          image,
          is_owner,
        } = data;

        is_owner
          ? setDealData({
              title,
              content,
              category,
              image
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setDealData({
      ...dealData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setDealData({
        ...dealData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/deals/${id}/`, formData);
      history.push(`/deals/${id}`);
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
            <span>Category:</span>
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Percentage discount">Percentage discount</option>
              <option value="Pounds off">Pounds off</option>
              <option value="Buy One Get One">Buy One Get One</option>
              <option value="Multi-buy">Multi-buy</option>
              <option value="Free shipping">Free shipping</option>
              <option value="Try before you buy">Try before you buy</option>
              <option value="Gift with purchase">Gift with purchase</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        {errors?.category?.map((message, idx) => (
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
                  htmlFor="image-upload1"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload1"
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

export default DealEditForm;
