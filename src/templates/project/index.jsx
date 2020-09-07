import React from "react";
import { graphql } from "gatsby";
import classnames from "classnames";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import ExternalLink from "../../components/externalLink";
import StargazersCount from "../../components/stargazersCount";
import ArticleNav from "../../components/articleNav";

import { IconKey } from "../../icons";

import styles from "./project.module.css";

const cleanURL = url => url.replace(/https?:\/\//, "");

const ProjectTemplate = ({ data, pageContext, location }) => {
  const {
    project: {
      html,
      frontmatter: { name, description, url, githubUrl, stargazersCount },
    },
  } = data;
  const { title: siteTitle } = data.site.siteMetadata;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={name} description={description} />
      <article className={styles.project}>
        <header className={styles.projectHeader}>
          <h1 className={classnames(styles.projectTitle, "title")}>{name}</h1>
          <StargazersCount count={stargazersCount} />
        </header>
        <nav className={styles.links}>
          <ExternalLink to={url}>Visit {cleanURL(url)}</ExternalLink>
          {!!githubUrl && (
            <ExternalLink to={githubUrl} iconKey={IconKey.github}>
              View on GitHub
            </ExternalLink>
          )}
        </nav>
        <section
          className={styles.projectBody}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <hr
          style={{
            marginBottom: "1rem",
          }}
        />
        <footer></footer>
      </article>
    <ArticleNav next={next} previous={previous} titleFieldName="name" />
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        name
        description
        url
        githubUrl
        stargazersCount
      }
    }
  }
`;
