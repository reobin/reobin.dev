import React from "react";

import { ExternalLink as ExternalLinkIcon, IconByKey } from "../../icons";

import styles from "./externalLink.module.css";

const ExternalLink = ({ to, children, iconKey }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.externalLink}
  >
    {children}
    {iconKey ? (
      <IconByKey iconKey={iconKey} className={styles.externalLinkIcon} />
    ) : (
      <ExternalLinkIcon className={styles.externalLinkIcon} />
    )}
  </a>
);

export default ExternalLink;
