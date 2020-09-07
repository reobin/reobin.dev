import React from "react";
import classnames from "classnames";
import { Link } from "gatsby";

import styles from "./articleTitle.module.css";

const ArticleTitle = ({ title, date, linkTo, titleTag }) => {
  const Title = titleTag || "h1";
  const TitleContainer = ({ children }) =>
    linkTo ? (
      <Link to={linkTo} className={styles.articleTitleLink}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  return (
    <>
      <Title className={classnames(styles.articleTitle, "title")}>
        <TitleContainer>{title}</TitleContainer>
      </Title>
    {!!date && (
      <small>{date}</small>
    )}
    </>
  );
};

export default ArticleTitle;
