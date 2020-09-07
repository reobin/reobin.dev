import React from "react";
import { Link } from "gatsby";

import styles from "./articleNav.module.css";

const ArticleNav = ({next, previous, titleFieldName = "title"}) => (
      <nav>
        <ul
          className={styles.list}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter[titleFieldName]}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter[titleFieldName]} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
)

export default ArticleNav;
