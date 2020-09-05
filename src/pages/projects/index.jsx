import React from "react";
import Image from "gatsby-image";
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
      <section className={styles.projects}>
        {projects.map(project => {
          const name = project.frontmatter.name || project.fields.slug;
          return (
            <article key={project.fields.slug} className={styles.project}>
              {!!project.frontmatter.featuredImage && (
                <Image
                  fluid={
                    project.frontmatter.featuredImage.childImageSharp.fluid
                  }
                  alt={`${project.frontmatter.name} featured image`}
                  className={styles.projectImage}
                  imgStyle={{ objectFit: "contain", width: "100%" }}
                />
              )}
              <header className={styles.projectHeader}>
                <div className={styles.projectTitleContainer}>
                <h2 className={classnames(styles.projectTitle, "title")}>
                  <Link className={styles.projectLink} to={project.fields.slug}>
                    {name}
                  </Link>
                </h2>
                <ProjectStack stack={project.frontmatter.stack} />
              </div>
                <StargazersCount count={project.frontmatter.stargazersCount} />
              </header>
              <div className={styles.projectBody}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: project.frontmatter.description,
                  }}
                />
              </div>
            </article>
          );
        })}
      </section>
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
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
