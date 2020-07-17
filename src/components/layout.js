import React from "react";

import Header from "./header";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  return (
    <>
      <Header title={title} isHome={location.pathname === rootPath} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Contact me at{" "}
        <a href="mailto:contact@reobin.dev">contact@reobin.dev</a>
      </footer>
    </>
  );
};

export default Layout;
