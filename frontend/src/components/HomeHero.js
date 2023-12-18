import React from "react";
import styles from "../styles/HomePage.module.css";

const HomeHero = () => {
  return (
    <header className="py-5">
      <div className="container">
        <div className={`p-4 p-lg-5 rounded-3 text-center ${styles.HeroImage}`}>
          <div className="m-3 m-lg-4">
            <h1 className="display-5 fw-bold text-white">Arcade Slate</h1>
            <p className={`text-white ${styles.HomeHero}`}>
              Welcome to our gaming blog, your ultimate destination for all
              things gaming! Here, we dive into the immersive worlds of video
              games, providing insightful reviews and engaging content for both
              casual players and hardcore enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
