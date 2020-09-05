import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import classnames from "classnames";

import styles from "./header.module.css";

const Header = ({ isHome }) => {
  const {
    site: {
      siteMetadata: { title },
    },
    avatar,
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        avatar: file(absolutePath: { regex: "/logo.png/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `,
  );

  const Title = isHome ? "h1" : "h3";

  return (
    <header className={classnames(styles.header, { [styles.home]: isHome })}>
      <nav className={styles.nav}>
        <Link className={styles.mainLink} to={`/`}>
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt="avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <Title>{title}</Title>
        </Link>
        <div className={styles.secondaryLinks}>
          <Link to="/blog">Blog</Link>
          <Link to="/projects">Open source projects</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
