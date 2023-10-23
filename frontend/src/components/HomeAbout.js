import React from "react";
import styles from "../styles/HomePage.module.css";

const HomeAbout = () => {
  return (
    <section className="pt-4">
      <div className="container px-lg-5">
        <div className="row gx-lg-5">
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i className={`fas fa-sign-in-alt ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Log in or sign up</h2>
                <p className="mb-0 text-white">
                  Log in or sign up to enjoy all the features
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i className={`fa-solid fa-receipt ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Review games</h2>
                <p className="mb-0 text-white">
                  Share your opinion on games you've played
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i className={`fa-solid fa-cart-shopping ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Post the best deals</h2>
                <p className="mb-0 text-white">
                  Share the deals you've found online or in store
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i className={`fas fa-user-plus ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Follow users</h2>
                <p className="mb-0 text-white">
                  Follow users so you don't miss what they post
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i className={`fas fa-heart ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Like posts</h2>
                <p className="mb-0 text-white">
                  Like posts to keep them in your liked section and show the authors' appreciation
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-4 mb-5">
            <div
              className={`card border-0 h-100 ${styles.DarkPurpleBackground}`}
            >
              <div className="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                <div
                  className={`feature bg-gradient rounded-3 mb-4 mt-n4 ${styles.YellowBackground}`}
                >
                  <i class={`fa-solid fa-comment ${styles.PurpleText}`}></i>
                </div>
                <h2 className="fs-4 fw-bold text-white">Leave your comments</h2>
                <p className="mb-0 text-white">
                  Comment on posts to share your thoughts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
