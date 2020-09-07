import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import ArticleTitle from "../../components/articleTitle";
import ArticleNav from "../../components/articleNav";

import styles from "./blogPost.module.css";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <ArticleTitle
            title={post.frontmatter.title}
            date={post.frontmatter.date}
          />
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <ArticleNav
        next={next}
        previous={previous}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
