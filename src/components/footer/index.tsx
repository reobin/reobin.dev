import IconGithub from '../icons/github';

import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <a href="https://github.com/reobin" target="_blank">
          Follow my work on Github <IconGithub />
        </a>
        <span>
          Contact me at <a href="mailto:me@reobin.dev">me@reobin.dev</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
