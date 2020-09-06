import React from "react";
import classnames from "classnames";

import { Star } from "../../icons";

import styles from "./stargazersCount.module.css";

const StargazersCount = ({ count, className }) => (
  <div className={classnames(styles.stargazersCount, className)}>
    <Star className={styles.stargazersCountIcon} />
    <span>{count}</span>
  </div>
);

export default StargazersCount;
