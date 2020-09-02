import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import styles from "./index.module.css";

const MainPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="All posts" />
      <div className={styles.heroContent}>
        <p className={styles.intro}>
          <span className="accent">
            <strong>Hi!</strong>
          </span>{" "}
          My name is Robin. I'm a web developer based in Montreal, QC.
        </p>
      </div>
    </Layout>
  );
};

export default MainPage;
