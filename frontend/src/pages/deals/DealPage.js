import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Deal from "./Deal";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";

function DealPage() {
  const { id } = useParams();
  const [deal, setDeal] = useState({});
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: deal }] = await Promise.all([
          axiosReq.get(`/deals/${id}`),
        ]);
        setDeal(deal);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 " lg={8}>
        <PopularProfiles mobile/>
        {deal && (
          <>
            <Deal deal={deal} setDeals={setDeal} dealPage />
          </>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles/>
      </Col>
    </Row>
  );
}

export default DealPage;
