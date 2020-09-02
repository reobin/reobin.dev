import React from "react";
import classnames from "classnames";
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";
import ProjectStack from "../../components/projectStack";
import SEO from "../../components/seo";
import StargazersCount from "../../components/stargazersCount";

import styles from "./projects.module.css";

const ProjectsPage = ({ data, location }) => {
  const { projects } = data.allMarkdownRemark;

  return (
    <Layout location={location}>
      <SEO title="Projects" />
      {projects.map(project => {
        const name = project.frontmatter.name || project.fields.slug;
        return (
          <article key={project.fields.slug} className={styles.container}>
            <header className={styles.header}>
              <h2 className={classnames(styles.title, "title")}>
                <Link style={{ boxShadow: `none` }} to={project.fields.slug}>
                  {name}
                </Link>
              </h2>
              <StargazersCount
                count={project.frontmatter.stargazersCount}
              />
            </header>
            <section className={styles.body}>
              <ProjectStack stack={project.frontmatter.stack} />
              <p
                dangerouslySetInnerHTML={{
                  __html: project.frontmatter.description,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(projects)/.*.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      projects: nodes {
        fields {
          slug
        }
        frontmatter {
          name
          description
          url
          stargazersCount
          stack
        }
      }
    }
  }
`;
