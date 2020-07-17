import React from "react";
import { Link, useStaticQuery } from "gatsby";
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
      <Title>
        <Link className={styles.mainLink} to={`/`}>
          {title}
        </Link>
      </Title>
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt="avatar"
        style={{
          marginRight: ".5rem",
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
    </header>
  );
};

export default Header;
