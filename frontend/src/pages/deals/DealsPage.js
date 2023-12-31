import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import Deal from "./Deal";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";

const Deals = () => {
  const [deals, setDeals] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axiosReq.get(`/deals/?search=${query}`);
        setDeals(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchDeals();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, pathname, currentUser]);

  return (
    <Container>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          {currentUser && (
            <div className="text-center">
              <Link
                to="/deals/create"
                className={`text-black text-decoration-none mb-2 mt-1 ${btnStyles.PostBright}`}
              >
                Share a deal
              </Link>
              <hr />
            </div>
          )}
          <PopularProfiles mobile />
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
              {deals.results.length ? (
                <InfiniteScroll
                children={deals.results.map((deal) => (
                  <Deal
                    key={deal.id}
                    deal={deal}
                    setDeals={setDeals}
                    dealPage
                  />
                ))}
                dataLength={deals.results.length}
                loader={<Asset spinner />}
                hasMore={!!deals.next}
                next={() => fetchMoreData(deals, setDeals)}
              />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message="No results" />
                </Container>
              )}
            </>
          ) : deals.results.length ? (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={"No more results"} />
            </Container>
          )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default Deals;
