import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Avatar from "./Avatar";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import styles from "../styles/NavBar.module.css";
import footerStyles from "../styles/Footer.module.css";
import homeStyles from '../styles/HomePage.module.css';

const Footer = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/liked">
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink className={styles.NavLink} to="/signup" activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  return (
    <section className={`border-bottom text-center mb-0 ${footerStyles.Footer} ${homeStyles.DarkPurpleBackground}`}>
      <nav>
        <NavLink className={styles.NavLink} exact activeClassName={styles.Active} to="/">
          <i className="fas fa-home"></i>Home
        </NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/reviews">
          <i className="fa-solid fa-receipt"></i>Reviews
        </NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/deals">
          <i className="fa-solid fa-cart-shopping"></i>Deals
        </NavLink>

        {currentUser ? loggedInIcons : loggedOutIcons}
      </nav>
      <hr/>
      <p className='text-white'>@ arcade slate, 2023</p>
    </section>
  );
};

export default Footer;
