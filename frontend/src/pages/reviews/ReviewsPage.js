import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import Review from "./Review";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import btnStyles from '../../styles/Button.module.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser()

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/?search=${query}`);
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, pathname, currentUser]);

  return (
    <Container className={""}>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
        {currentUser && (
            <div className="text-center">
              <Link
                to="/reviews/create"
                className={`text-black text-decoration-none mb-2 mt-1 ${btnStyles.PostBright}`}
              >
                Post a review
              </Link>
              <hr />
            </div>
          )}
          <PopularProfiles mobile/>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search posts"
            />
          </Form>

          {hasLoaded ? (
            <>
              {reviews.results.length ? (
                <InfiniteScroll
                  children={reviews.results.map((review) => (
                    <Review
                      key={review.id}
                      review={review}
                      setReviews={setReviews}
                    />
                  ))}
                  dataLength={reviews.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!reviews.next}
                  next={() => fetchMoreData(reviews, setReviews)}
                />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message='No results' />
                </Container>
              )}
            </>
          ) : (
            (reviews.results.length) ? 
            (<Container className={appStyles.Content}>
              <Asset spinner/>
            </Container>)
            :
            (<Container className={appStyles.Content}>
              <Asset src={NoResults} message={"No more results"} />
            </Container>)
            
          )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles/>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewsPage;
