import React from "react";

import { IconByKey } from "../../icons";

import styles from "./projectStack.module.css";

const ProjectStack = ({ stack }) =>
  !!stack && stack.length > 0 ? (
    <div className={styles.stack}>
      {stack.map(tech => (
        <IconByKey key={tech} iconKey={tech} className={styles.stackIcon} />
      ))}
    </div>
  ) : (
    <></>
  );

export default ProjectStack;
