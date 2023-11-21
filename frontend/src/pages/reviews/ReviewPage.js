import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import appStyles from '../../App.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import Review from './Review';

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${id}`);
        setReview(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2 ' lg={8}>
        {review &&(
          <>
            <Review review={review} setReviews={setReview} reviewPage />
            <Container className={appStyles.Content}>Comments</Container>
          </>
        )}
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ReviewPage;