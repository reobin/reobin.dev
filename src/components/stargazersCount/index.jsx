import React from "react";

import { Star } from "../../icons";

import styles from "./stargazersCount.module.css";

const StargazersCount = ({ count }) => (
  <div className={styles.stargazersCount}>
    <Star className={styles.stargazersCountIcon} />
    <span>{count}</span>
  </div>
);

export default StargazersCount;
